const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'bina1234',
    database: 'hdasim',

});


app.listen(3001, () => {
    console.log("server run")
})

//add new user to db
app.post('/addUser', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const userId = req.body.userId
    const address = req.body.address
    const dateOfBirth = req.body.dateOfBirth
    const phone = req.body.phone
    const mPhone = req.body.mPhone

    db.query(
        'INSERT INTO users (firstName, lastName, userId, address, dateOfBirth, phone, mPhone) VALUES (?,?,?,?,?,?,?)',
        [firstName, lastName, userId, address, dateOfBirth, phone, mPhone],
        (err, result) => {
            if (err) {
                console.log("error add user ", err)
            }
            else {
                res.send("Add user to db")
            }
        })
})

//get users data list
app.get('/getUsersList', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log('error get user list ', err)
        }
        else {
            res.send(result)
        }
    })
})

//get types of vaccine
app.get('/getVaccineTypes', (req, res) => {
    db.query('SELECT * FROM type_vaccine', (err, result) => {
        if (err) {
            console.log('error get vaccine types ', err)
        }
        else {
            res.send(result)
        }
    })
})

//get user vaccine per id
app.post('/getUserVaccine', (req, res) => {
    const id = req.body.id
    db.query(`SELECT * FROM users_vaccine WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log('error get user vaccine ', err)
        }
        else {
            res.send(result)
        }
    })
})

//get user status per id
app.post('/getUserStatusList', (req, res) => {
    const id = req.body.id
    db.query(`SELECT DISTINCT * FROM users_status WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log('error get user status ', err)
        }
        else {
            res.send(result)
        }
    })
})

app.post('/getId', (req, res) => {
    const userId = req.body.userId
    db.query(`SELECT id FROM users WHERE userId = ${userId}`, (err, result) => {
        if (err) {
            console.log('error get user vaccine ', err)
        }
        else {
            console.log('success get user vaccine ', result)
            res.send(result)
        }
    })
})

//update or insert to vaccine user list
app.post('/setVaccineList', (req, res) => {
    const userVaccinationList = req.body.userVaccinationList
    userVaccinationList.map(val => {

        console.log("hhhh pp ", val)
        const row = db.query(`SELECT * FROM users_vaccine WHERE  id = ${val.id} AND vaccinId = ${val.vaccinId}`, (err, result) => {
            if (err) {
                console.log('error get user vaccine ', err)
            }
            else {
                if (result[0]) {
                    db.query(`UPDATE users_vaccine SET vaccinDate = "${val.vaccinDate}", manufacturerName= "${val.manufacturerName}" WHERE vaccinId = ${val.vaccinId} AND id = ${val.id}`, (error, results) => {
                        if (error) {
                            console.log('error update user vaccine ', err)
                        }
                        console.log('success update user vaccine:', results);
                    });
                }
                else {
                    var sql = "INSERT INTO users_vaccine (id, vaccinId, vaccinDate, manufacturerName) VALUES('" + val.id + "','" + val.vaccinId + "', '" + val.vaccinDate + "', '" + val.manufacturerName + "');"
                    db.query(sql
                        , (err, result) => {
                            if (err) {
                                console.log('error insert user vaccine ', err)
                            }
                            else {
                                console.log("success insert user vaccine ", result)
                            }
                        })
                }
            }
        })
    })
})


//update or insert to status user list
app.post('/updateUserStatusList', (req, res) => {
    const id = req.body.id
    const userStatusList = req.body.userStatusList
    userStatusList.map(val => {
        const row = db.query(`SELECT DISTINCT * FROM users_status WHERE  id = ${id} And status=${val.status} `, (err, result) => {
            if (err) {
                console.log('error get user status ', err)
            }
            else {
                if (result[0]) {
                    db.query(`UPDATE users_status SET statusDate = "${val.statusDate}" WHERE id = ${val.id} AND status = ${val.status}`, (error_up, results_up) => {
                        if (error_up) {
                            console.log('error update user status ', error_up)
                        }
                        console.log('success update user status', results_up.affectedRows);
                    });

                }
                else {
                    var sql = "INSERT INTO users_status (id, status, statusDate) VALUES(" + id + "," + val.status + ", '" + val.statusDate + "');"
                    db.query(sql
                        , (error_in, result_in) => {
                            if (error_in) {
                                console.log('error insert user status ', result_in)
                            }
                            else {
                                console.log("success insert status", result_in)
                                // res.send(result_in)
                            }
                        })
                }
            }
        })
    })
})

//delete users data from db
app.post('/deleteUser', function (req, res) {
    var id = req.body.id
    db.query(`DELETE FROM users WHERE  id =${id}`, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result)
        }

    });
})

//delete users vaccine data from db
app.post('/deleteDataVac', function (req, res) {
    var id = req.body.id
    db.query(`DELETE FROM users_vaccine WHERE  id =${id}`, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result)
        }

    });
})

//delete users status data from db
app.post('/deleteDataStatus', function (req, res) {
    var id = req.body.id
    db.query(`DELETE FROM users_status WHERE id =${id}`, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result)
        }

    });
})

//update user data
app.post('/setUserData', (req, res) => {
    const id = req.body.id
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const userId = req.body.userId
    const address = req.body.address
    const dateOfBirth = req.body.dateOfBirth
    const phone = req.body.phone
    const mPhone = req.body.mPhone

    db.query(
        `UPDATE users SET firstName = "${firstName}", lastName= "${lastName}", userId= "${userId}", address= "${address}", dateOfBirth= "${dateOfBirth}", phone= "${phone}", mPhone= "${mPhone}" WHERE id = ${id}`, (error, results) => {
            if (error) {
                console.log('error update user data ', error)
            }
            console.log("success update users data  ", results)
        })
})
