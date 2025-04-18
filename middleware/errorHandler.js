import { logEvents } from "./logEvents.js"

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
        .then(err => {
            console.error(err)
            res.status(500).send(err)
        })
}

export default errorHandler