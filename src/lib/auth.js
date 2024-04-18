
// Import the connection and the cookieSession, and bcrypt
import connection from "../config/connection.config.js";
import logger from '../config/logger.config.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 12;

export const authUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    connection('users')
        .select('*')
        .where({ email: email })
        .then((data) => {
            if (data.length > 0) {
                const user = data[0];
                if (user.isActive === 0) {
                    res.status(401).json({ error: 'Usuario Inactivo' });
                    return;
                }
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        // Set the session data
                        req.session.user = user;
                        //Use the method eventMovement for update some data in the table movements, only with the idUser
                        eventMove.eventMovement({ idUser: user.idUser });
                        // Set a cookie with the session ID
                        res.cookie('sessionId', req.session.id, {
                            maxAge: 3600000 * 24 * 7, // 60 min * 24 (hr) * 7 (dd)
                            httpOnly: true,
                            secure: false // Set to true if using HTTPS
                        });
                        //Create a token using JWT with userName and privateKey
                        //Write log for user logged
                        logger.info(`User ${user.email} logged in`);
                        res.status(200).json(user);
                    } else {
                        res.status(401).json({ error: 'Contraseña Incorrecta, Revisa y vuelve a intentar' });
                    }
                });
            } else {
                res.status(401).json({ error: 'El usuario no se encuentra' });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

//Function for the logout
export const logout = (req, res) => {
    //Destroy the session
    req.session.destroy();
    //Clear the cookies
    res.clearCookie('connect.sid');
    //Return the message
    res.status(200).json({ message: "Sesión cerrada" });
};

// //Export the authUser function
// module.exports = {authUser, logout};