import sendMail from "../lib/emailSender.js"
import fs from 'fs'
import logger from "../config/logger.config.js"

export const sendEmail = async (template, dataOptions) => {
    const toReceiver = dataOptions.email
    const theSubject = dataOptions.subject

    try {
        const rawTemplate = fs.readFileSync(`./templates/emails/${template}.html`, 'utf8')

        const filledTemplate = replaceTemplate(rawTemplate, dataOptions)

        await sendMail(theSubject, filledTemplate, toReceiver)
        logger.info(`Email for New Registration sent to ${toReceiver}`)
    } catch (error) {
        logger.error(`Failed to send email: ${error.message}`)
    }
}

function replaceTemplate(template, dataOptions) {
    return Object.keys(dataOptions).reduce((currentTemplate, key) => {
        const regex = new RegExp(`{${key}}`, 'g')
        return currentTemplate.replace(regex, dataOptions[key])
    }, template)
}
