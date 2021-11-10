const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile } = require('../controllers/AnalyzerController')

const app = express()

module.exports = function(app) {

    app.post("/api/uploadApk", upload.single('file'), async (req, res) => {

        const file = req.file
        console.log(file)

        if(file === null){
            return res.status(400).json({msg:'No file uploaded'})
        }

        const result = await uploadFile(file)
        console.log(result)

    })

}
