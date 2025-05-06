import express from 'express'
import rootRouter from './routes/index'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000

app.use('/api/v1', rootRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on localhost:${PORT}`)
})