import { Request, Response } from "express"

require("dotenv").config()
const express = require("express")
const app = express()

app.use(require("cors"))
app.use(express.json())

app.use("/", (_: Request, res: Response) => {
	res.json({ message: "Hello, World!" })
})

app.use("/api", require("./routes/api"))

app.use("*", (_: Request, res: Response) => {
	res.status(404).json({ message: "ERROR 404: Page not found!" })
})

module.exports = app
