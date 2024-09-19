import { Request, Response } from "express"

const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.use("/", (_: Request, res: Response) => {
	res.json({ message: "Hello, World!" })
})

module.exports = app
