import express from 'express'
import path from 'path'
import cors from 'cors'
import 'dotenv/config'
import { logger } from './middleware/logEvents.js'
import errorHandler from './middleware/errorHandler.js'
import verifyJWT from './middleware/verifyJWT.js'
import cookieParser from 'cookie-parser'
import credentials from './middleware/credentials.js'
import corsOptions from './config/corsOptions.js'
import sequelize from './config/dbConn.js'

// Import Routes
import authRouter from './routes/authRouter.js'
import clientsRoutes from './routes/clientsRouter.js'
import usersRoutes from './routes/usersRouter.js'
import testRouter from './routes/testRouter.js'

const app = express()
const PORT = process.env.APP_PORT || 3500

// Connect to MySQL with Sequelize
sequelize.sync()
    .then(() => {
        console.log('Connected to MySQL database')
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch(err => console.error('Unable to connect to the database:', err))

// Custom middleware logger
app.use(logger)

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross-Origin Resource Sharing
app.use(cors(corsOptions))

// Built-in middleware to handle URL-encoded form data
app.use(express.urlencoded({ extended: false }))

// Built-in middleware for JSON
app.use(express.json())

// Middleware for cookies
app.use(cookieParser())

// Serve static files
app.use('/', express.static(path.join(path.resolve(), '/public')))


// Public Routes
app.use('/api/auth', authRouter)

// Protected Routes
// app.use(verifyJWT)
app.use('/clients', clientsRoutes)
app.use('/users', usersRoutes)

// Test Routes
app.use('/v1', testRouter)



app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(path.resolve(), 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" })
    } else {
        res.type('txt').send("404 Not Found")
    }
})

app.use(errorHandler)