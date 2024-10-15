import { Request, Response } from "express"

const express = require("express")
const app = express()
const cors = require("cors")

if(process.env.NODE_ENV !== "production")
	require("dotenv").config()

app.use(cors())
app.use(express.json())

app.use("^/$", (_: Request, res: Response) => {
	res.json({ message: "Hello, World!" })
})

app.get("/search", require("../middleware/search"))

app.listen(3000, () => console.log("Server running on PORT 3000"))

module.exports = app
