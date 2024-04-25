
// Import the connection and the cookieSession, and bcrypt
import { connection } from "../config/connection.config.js"
import logger from '../config/logger.config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const saltRounds = 12

export const authUser = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    connection('users')
        .select('*')
        .where({ email: email })
        .then((data) => {
            if (data.length > 0) {
                const user = data[0]
                if (user.is_active === 0) {
                    res.status(401).json({ error: 'Usuario Inactivo' })
                    return
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.status(500).json({ error: 'Error al verificar la contraseña' })
                        return
                    }
                    if (result) {
                        req.session.user = user
                        res.cookie('sessionId', req.session.id, {
                            maxAge: 3600000 * 24 * 7,
                            httpOnly: true,
                            secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
                            sameSite: 'strict'
                        })
                        const token = jwt.sign({ name: user.name, main_id: user.main_id }, process.env.JWT_SECRET, { expiresIn: '1h' })
                        logger.info(`User ${user.email} logged in`)
                        res.status(200).json({ user, token })
                    } else {
                        res.status(401).json({ error: 'Contraseña Incorrecta, Revisa y vuelve a intentar' })
                    }
                })
            } else {
                res.status(401).json({ error: 'El usuario no se encuentra' })
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message })
        })
}

//Function for the logout
export const logout = (req, res) => {
    //Destroy the session
    req.session.destroy()
    //Clear the cookies
    res.clearCookie('connect.sid')
    //Return the message
    res.status(200).json({ message: "Sesión cerrada" })
}