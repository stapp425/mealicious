import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import apiRouter from "./routes/api"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use("^/$", (_, res) => {
	res.json({ message: "Hello, World!" })
})

app.use("/api", apiRouter)

app.use("*", (_, res) => {
	res.status(404).json({ message: "ERROR 404: Page not found!" })
})
