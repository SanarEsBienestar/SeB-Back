import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import logger from "../config/logger.config.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dataPath = path.join(__dirname,'..', 'data', 'availability.json') // Puede necesitar ajuste dependiendo de la ubicación real del archivo

export const getAvailability = async (req, res) => {
    try {
        const fileContent = fs.readFileSync(dataPath, 'utf-8')
        const jsonData = JSON.parse(fileContent) // Parsear el contenido del archivo como JSON
        res.status(200).json(jsonData) // Retornar los datos parseados
    } catch (error) {
        // Aquí se maneja cualquier error que pueda ocurrir al leer o parsear el archivo
        logger.error("Error reading availability data: ", error)
        throw error // Lanzar el error para que pueda ser manejado por el llamador
    }
}

export const updateWorkday = async (req, res) => {
    const { id, work_day, hour_init, hour_finish } = req.body

    try {
        const fileContent = fs.readFileSync(dataPath, 'utf-8')
        const jsonData = JSON.parse(fileContent)

        // Encontrar el índice del día en el arreglo 'days_work' usando el ID
        const index = jsonData.days_work.findIndex(day => day.id === id)

        if (index === -1) {
            res.status(404).send("Workday not found.")
            return
        }

        // Actualizar solamente los campos permitidos
        jsonData.days_work[index].work_day = work_day
        jsonData.days_work[index].hour_init = hour_init
        jsonData.days_work[index].hour_finish = hour_finish

        // Escribir los cambios de vuelta al archivo JSON
        fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2), 'utf-8')

        res.status(200).json(jsonData.days_work[index])
    } catch (error) {
        logger.error("Error updating availability data: ", error)
        res.status(500).send("Error updating the workday.")
    }
}

export const addDateOff = async (req, res) => {
    const { date_off } = req.body

    try {
        const fileContent = fs.readFileSync(dataPath, 'utf-8')
        const jsonData = JSON.parse(fileContent)
        const currentDate = new Date().toISOString().split('T')[0] // Obtener la fecha actual en formato 'yyyy-mm-dd'

        // Validar que la fecha no sea inferior a la fecha actual
        if (date_off < currentDate) {
            res.status(400).send("Cannot create a date off in the past.")
            return
        }

        // Convertir la fecha 'yyyy-mm-dd' a 'yyyymmdd' para usar como ID
        const id = parseInt(date_off.replace(/-/g, ''))

        // Verificar si la fecha ya existe en el arreglo 'dates_off'
        const dateExists = jsonData.dates_off.some(date => date.id === id)
        if (dateExists) {
            res.status(409).send("This date off already exists.")
            return
        }

        // Agregar la nueva fecha con el ID basado en la fecha
        const newDateOff = { id, date_off }
        jsonData.dates_off.push(newDateOff)

        // Escribir los cambios de vuelta al archivo JSON
        fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2), 'utf-8')
        res.status(201).json(newDateOff)
    } catch (error) {
        logger.error("Error adding new date off: ", error)
        res.status(500).send("Error adding new date off.")
    }
}
