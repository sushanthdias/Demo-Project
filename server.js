const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require("./config/db");

const app = express();

//connect Databse 
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//For File Upload
app.use(fileUpload());
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No File was uploaded" });
    }
    const file = req.files.file;
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errors: err });
        }
        return res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    })
});

app.get('/', (req, res) => res.send("API Running"));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/book', require('./routes/api/book'));
app.use('/api/author', require('./routes/api/author'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
