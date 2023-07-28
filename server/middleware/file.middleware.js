const multer = require("multer")
const fs = require("fs")
const fsPromise = require("fs/promises")
const path = require("path")

const sketchPath = path.join(__dirname, "..","tatoo")
async function clear (user) {
    const fileArr = await fsPromise.readdir(path.join(sketchPath, user, "temporery"))
    if(fileArr.length > 0) {
        for (const file of fileArr) {
            await fsPromise.unlink(path.join(path.join(sketchPath, user, "temporery"), file));
        }
    }
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        if (!fs.existsSync(path.join( sketchPath, req.user._id))) {
            if (!fs.existsSync(sketchPath)) {
                fs.mkdirSync(sketchPath)
            }
            console.log(!fs.existsSync(sketchPath))
            fs.mkdirSync(path.join( sketchPath, req.user._id))
            fs.mkdirSync(path.join( sketchPath, req.user._id, "temporery"))
        } else if (!fs.existsSync(path.join( sketchPath, req.user._id, "temporery"))) {
            fs.mkdirSync(path.join( sketchPath, req.user._id, "temporery"))
        }
        cb(null, "tatoo/"+req.user._id+"/temporery/")
    },
    filename(req, file, cb) {
        clear(req.user._id).then(()=>{
            cb(null, file.originalname.replace(/:/g, "-"))
        })
    }
})

const types = ["image/png", "image/jpeg", "image/jpeg"]

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({storage, fileFilter})