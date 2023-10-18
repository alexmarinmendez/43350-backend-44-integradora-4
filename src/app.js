import express from 'express'
import router from './routers/pizza.router.js'
import mongoose from 'mongoose'
import { loggerHttp } from './utils/logger.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUIExpress from 'swagger-ui-express'

const specs = swaggerJSDoc({
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentation de Pizzas',
            description: 'Details....'
        }
    },
    apis: ['./docs/**/*.yaml']
})

const app = express()
app.use(express.json())
app.use(loggerHttp)
app.use('/docs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

app.use('/api/pizzas', router)

mongoose.connect('mongodb://localhost:27017', {
    dbName: 'pizza_planet'
}).then(() => {
    app.listen(8080, () => console.log('Server Up!'))
}).catch(err => console.log(err.message))