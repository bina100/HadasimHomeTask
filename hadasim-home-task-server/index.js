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
    console.log("kk", req.body.phone, req.body.mPhone)
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
    console.log("www")
    const id = req.body.id

    console.log("ll", id, req, res)
    db.query(`SELECT * FROM users_vaccine WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log('error get user vaccine ', err)
        }
        else {
            res.send(result)
        }
    })
})

app.post('/getId', (req, res) => {
    const userId = req.body.userId

    console.log("ll", userId, req, res)
    db.query(`SELECT id FROM users WHERE userId = ${userId}`, (err, result) => {
        if (err) {
            console.log('error get user vaccine ', err)
        }
        else {
            res.send(result)
        }
    })
})

app.post('/setVaccineList', (req, res) => {
    const userVaccinationList = req.body.userVaccinationList

    // console.log("ll", userId, req, res)
    userVaccinationList.map(val => {

        console.log("hhhh pp ", val)
        const row =  db.query(`SELECT * FROM users_vaccine WHERE  id = ${val.id} AND vaccinId = ${val.vaccinId}`, (err, result) => {
            if (err) {
                console.log('error get user vaccine ', err)
            }
            else {
                console.log("reeesss ", result)
                // res.send(result)
                if(row)
        {
            db.query(`UPDATE users_vaccine SET vaccinDate = "${val.vaccinDate}", manufacturerName= "${val.manufacturerName}" WHERE vaccinId = ${val.vaccinId} AND id = ${val.id}`, 
            (err, result) => {
            if (err) {
                console.log('error get user vaccine ', err)
            }
            else {
                console.log("reeesss up  ", result)
                res.send("success update vaccin list", result)
            }
})

              
        }
        else{
            db.query(`  INSERT INTO users_vaccine
                 (id, vaccinId, vaccinDate, manufacturerName )
                VALUES (${val.id} ,${val.vaccinId}, ${val.vaccinDate},  ${val.manufacturerName});
            `, (err, result) => {
            if (err) {
                console.log('error get user vaccine ', err)
            }
            else {
                console.log("reeesss insert  ", result)
                res.send(result)
            }
        }) 
    }
            }
        })
        console.log("rrrrroww ", row)
        
   

        // db.query( `IF EXISTS(SELECT * FROM users_vaccine WHERE id = ${val.id}) THEN
        //     UPDATE users_vaccine 
        //     SET  vaccinDate = ${val.vaccinDate},
        //         manufacturerName = ${val.manufacturerName},
        //     WHERE id = ${val.id} AND vaccinId = ${val.vaccinId};
        // ELSE
        //     INSERT INTO users_vaccine
        //     (id, vaccinId, vaccinDate, manufacturerName )
        //     VALUES (${val.id} ,${val.vaccinId}, ${val.vaccinDate},  ${val.manufacturerName});
        // END IF;`,
        //  (err, result) => {
        //     if (err) {
        //         console.log('error get user vaccine ', err)
        //     }
        //     else {
        //         res.send(result)
        //     }
        // })
        })
})

//delete users data from db
app.post('/deleteUser', function (req, res) {
    var id = req.body.id
    console.log("iiiii ", id)
    db.query(`DELETE FROM users WHERE  id =${id}`, function (err, result) {
      if (err) {
        res.send(err);
      }
      else{
        res.send(result)
      }
       
    });
  })

  //delete users vaccine data from db
  app.post('/deleteDataVac', function (req, res) {
    var id = req.body.id
    console.log("iiiii ", id)
    db.query(`DELETE FROM users_vaccine WHERE  id =${id}`, function (err, result) {
      if (err) {
        res.send(err);
      }
      else{
        res.send(result)
      }
       
    });
  })