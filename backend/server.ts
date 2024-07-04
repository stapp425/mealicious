import express, { Request, Response } from "express"
import path from "path"
import cors from "cors"
import dotenv from "dotenv"
import apiRouter from "./api/api"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "../frontend/src")))
app.use(cors())
app.use(express.json())

app.use("^/$", (req:Request, res:Response) => {
	res.json({ message: "Hello, World!" })
})

app.use("/api", apiRouter)

app.use("*", (req:Request, res:Response) => {
	res.status(404).json({ message: "ERROR 404: Page not found!" })
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
