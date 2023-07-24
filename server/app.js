const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const chalk = require("chalk")
const config = require("config")
const initDatabase = require("./startUp/initDataBase")
const routes = require("./routes")
const cors = require("cors")

const PORT = config.get("port")

const app = express()
app.use(express.json())
app.use("/sketches", express.static(path.join(__dirname, "sketches")))
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use("/api", routes)

async function start() {
    try {
        mongoose.connection.once("open", ()=>{
            initDatabase()
        })

        await mongoose.connect(config.get("mongoUri"))
        console.log(chalk.green("MongoDB connected!"))
        app.listen(PORT,() => {
            console.log(
                chalk.green(`Server has been started on port ${PORT}...`)
            )
        })
    } catch (error) {
        console.log(chalk.red(error.message))
        process.exit(1)
    }

}

start()