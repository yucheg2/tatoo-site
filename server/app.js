const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const chalk = require("chalk")
const config = require("config")
const initDatabase = require("./startUp/initDataBase")
const routes = require("./routes")
const cors = require("cors")
const fs = require("fs")

const PORT = config.get("port")

const app = express()
app.use(express.json())
app.use("/tatoo", express.static(path.join(__dirname, "tatoo")))
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use("/api", routes)

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client")))

    const indexPath = path.join(__dirname, "client", "index.html")

    app.get("*", (req, res) => {
        res.sendFile(indexPath)
    })
}

async function start() {
    try {
        mongoose.connection.once("open", ()=>{
            initDatabase()
        })

        if (!fs.existsSync(path.join(__dirname, "tatoo"))) {
            fs.mkdirSync(path.join(__dirname, "tatoo"))
        }
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