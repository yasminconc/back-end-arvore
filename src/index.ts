import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import { userRouter } from './Router/UserRouter'

dotenv.config()

const port: number = Number(process.env.PORT) || 3000
const app: Express = express()

app.use(express.json())
app.use(cors())

const server = app.listen(port, () => {
  if (server) {
    console.log(`The server is running on localhost:${port}`)
  } else {
    console.log('Error running the server')
  }
})

app.use(userRouter)