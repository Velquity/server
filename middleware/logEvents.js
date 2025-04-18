import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const fsPromises = fs.promises

// Workaround for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        const logsDir = path.join(__dirname, '..', 'logs')
        if (!fs.existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir)
        }

        await fsPromises.appendFile(path.join(logsDir, logName), logItem)
    }
    catch (error) {
        console.error(`Error: ${error.message}`)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.user}\t${req.url}`, 'reqLog.txt')
        .then(() => {
            console.log(`${req.method} ${req.path}`)
            next()
        })
        .catch(err => {
            console.error(`Error: ${err.message}`)
            next()
        })
}

export { logger, logEvents }