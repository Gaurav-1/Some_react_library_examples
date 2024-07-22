require('dotenv').config()
const express = require('express')
const { v4: uuid } = require('uuid');
const mysql = require('mysql')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/public/employeePics'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage })

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(upload.any())

const con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME
})
con.connect()


const getEmployee = async (req, res) => {
    try {
        const qry = `SELECT * FROM employee`
        con.query(qry, (error, result) => {
            if (error) {
                console.log('Get Error', error);
                res.status(501).json({ error: 'No result found' })
            }
            else {
                res.status(200).json({ message: result })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(501).json({ error: 'Some error occure. try again later' })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const qry = `DELETE FROM employee WHERE id = '${req.body.id}'`
        con.query(qry, (error, result) => {
            if (error) {
                console.log('Delete Error: ', error);
                res.status(501).json({ error: 'Data not deleted' })
            }
            else
                res.status(200).json({ message: 'deleted' })
        })
    } catch (error) {
        console.log('Delete Error:', error);
        res.status(501).json({ error: 'Some error occure. try again later' })
    }
}

const addEmployee = async (req, res) => {
    console.log(req)
    try {
        const result = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${req.body.city},${req.body.state},${req.body.country}&apiKey=8bd6cc7da70c47acb3a2836c760689fc`, { method: 'GET' })
            .then(response => response.json())

        const coordinates = [result.features[0].geometry.coordinates[0], result.features[0].geometry.coordinates[1]]

        const id = uuid()
        const body = {
            id: id,
            img: req.file.filename,
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            salary: req.body.salary,
            latitude: coordinates[1],
            longitude: coordinates[0],
        }

        const qry = `INSERT INTO employee SET ?`
        con.query(qry, body, (error, result) => {
            if (error)
                res.status(501).json({ error: 'Employee not added' })
            else
                res.status(200).json({ message: body })
        })

    } catch (error) {
        console.log(error);
        res.status(501).json({ error: 'Some error occured. Try again later' })
    }
}

const constructTables = async () => {
    try {
        const qry = `CREATE TABLE IF NOT EXISTS Employee(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255),
            address VARCHAR(255),
            city VARCHAR(255),
            state VARCHAR(255),
            country VARCHAR(255),
            salary INTEGER,
            latitude DECIMAL(10,8),
            longitude DECIMAL(10,8)
        )`
        con.query(qry, (error, result) => {
            if (error) console.log(error)
            else console.log('Table created');
        })
    } catch (error) {
        console.log(error);
    }
}

const uploadData = async () => {
    try {
        const datas = await fetch('https://dummyjson.com/users?limit=20').then(res => res.json())
        datas.users.map((data) => console.log(data.address.coordinates.lat))
        datas.users.map((data) => {
            const qry = `INSERT INTO Employee VALUES('${uuid()}','${data.firstName}','${data.address.address}','${data.address.city}','${data.address.state}', 'USA','${(data.age) * 1000}','${data.address.coordinates.lat}','${data.address.coordinates.lng}')`
            con.query(qry, (error, result) => {
                if (error) console.log(error);
                else console.log('Inserted');
            })
        })
    } catch (error) {
        console.log(error);
    }
}


app.route('/employee')
    .get(getEmployee)
    .post(addEmployee)
    .delete(deleteEmployee)

app.listen(3000, async (req, res) => {
    // await constructTables()
    // await uploadData()
    console.log('Hearing PORT: 3000');
})