const express = require("express")
const mongoose = require("mongoose")
const chalk = require("chalk")
const config = require("config")
const initDatabase = require("./startUp/initDataBase")
const routes = require("./routes")

const PORT = config.get("port")

const app = express()
//prostoyurka1223
//1488228420
app.use(express.json())
app.use(express.urlencoded({extended: false}))
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