import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Input from '../Input';
import Axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai';

const User = () => {
    console.log("test pr");
    const location = useLocation();
    const { userData, parent } = location.state;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userId, setUserId] = useState("");
    const [address, setAddress] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phone, setPhone] = useState("");
    const [mPhone, setMPhone] = useState("");
    const [userVaccinationList, setUserVaccinationList] = useState([])
    const [vaccineTypesList, setVaccineTypesList] = useState([])

    useEffect(() => {
        getVaccineTypes()


        if (userData != null) {
            getUserVaccine()
            setFirstName(userData.firstName)
            setLastName(userData.lastName)
            setUserId(userData.userId)
            setAddress(userData.address)
            setDateOfBirth(userData.dateOfBirth)
            setPhone(userData.phone)
            setMPhone(userData.mPhone)
        }


    }, [])
    console.log("uuuss ", userData)
    // function send data from new user to database
    const addNewUser = () => {
        Axios.post('http://localhost:3001/addUser',
            {
                firstName: firstName,
                lastName: lastName,
                userId: userId,
                address: address,
                dateOfBirth: dateOfBirth,
                phone: phone,
                mPhone: mPhone,
            }).then(() => {
                console.log("success add new user")
            });
            getIdUser()
    }

    const getIdUser = () => {
        Axios.post('http://localhost:3001/getId', {userId: userId}).then((response) => {
            console.log("success get id", response)
            const id = response.data[0].id
            setVaccineList(id)
            
        })
    }
    const setVaccineList = (id) => {
        // try{
            const userVaccine = [...userVaccinationList]
            console.log("1234 ",id)
            userVaccine.map(x => x.id = id)
            console.log("1234 ",userVaccine)
            console.log("tt ",userVaccine)
            setUserVaccinationList(userVaccine)
        //     let res = await Axios.post('http://localhost:3001/setVaccineList',  {userVaccinationList: userVaccinationList});
    
        //     let data = res.data;
        //     console.log("success set vaccine list", data);
        // }
        // catch(err){
        //     console.log(err)
        // }
        
        Axios.post('http://localhost:3001/setVaccineList', {userVaccinationList: userVaccinationList}).then((response) => {
            console.log("success set vaccine list", response)
        })
    }

    //function get the list of vaccine types
    const getVaccineTypes = () => {
        Axios.get('http://localhost:3001/getVaccineTypes').then((response) => {
            console.log("success get vaccine types", response)
            setVaccineTypesList(response.data)
        })
    }

    //function get the list of vaccine of user
    const getUserVaccine = () => {
        console.log("ppp")
        Axios.post('http://localhost:3001/getUserVaccine', { id: userData.id }
        ).then((response) => {
            console.log("success get user vaccine", response)
            setUserVaccinationList(response.data)
        })
    }

    const changeDataOfVaccine = (event, id) => {
        console.log("nn ", event, id)
        const userVaccine = [...userVaccinationList]
        userVaccine.find(x => x.vaccinId == id).vaccinDate = event
        setUserVaccinationList(userVaccine)
    }

    const changeManufacturerNameOfVaccine = (event, id) => {
        console.log("nn ", event, id)
        const userVaccine = [...userVaccinationList]
        userVaccine.find(x => x.vaccinId == id).manufacturerName = event
        setUserVaccinationList(userVaccine)
    }

    const addRow = () => {
        const userVaccine = [...userVaccinationList]
        console.log(userVaccine.length + 1)
        const newRow = {
            id: userData ? userData.id : 0,
            vaccinId: userVaccine.length + 1,
            vaccinDate: new Date(),
            manufacturerName: "",
        }
        userVaccine.push(newRow)
        setUserVaccinationList(userVaccine)
    }


    return (
        <div className='user'>
             <span className='back-to-users-list' >
                <Link
                    to={`/`}
                >- &gt;</Link>
            </span>
            <span className='user-details'>
            
            <Input
                label=":שם פרטי"
                type="text"
                value={firstName}
                disabled={parent == 'showData' ? true : false}
                inputChange={(value) => setFirstName(value)}
            />
            <Input
                label="שם משפחה"
                type="text"
                value={lastName}
                disabled={parent == 'showData' ? true : false}
                inputChange={(value) => setLastName(value)}
            />
            <Input
                label=":מספר זהות"
                type="text"
                value={userId}
                disabled={parent == 'showData' ? true : false}
                inputChange={(value) => setUserId(value)}
            />
            <Input
                label=":כתובת"
                type="text"
                value={address}
                disabled={parent == 'showData' ? true : false}
                inputChange={(value) => setAddress(value)}
            />
            <Input
                label=":תאריך לידה"
                type="date"
                value={moment(new Date(dateOfBirth)).format('YYYY-MM-DD') }
                disabled={parent == 'showData' ? true : false}
                inputChange={(value) => setDateOfBirth(value)}
            />
            <Input
                label=":טלפון"
                type="text"
                value={phone}
                disabled={parent == 'showData' ? true : false}
                inputChange={(value) => setPhone(value)}
            />
            <Input
                label=":טלפון נייד"
                type="text"
                value={mPhone}
                disabled={parent == 'showData' ? true : false}
                inputChange={(value) => setMPhone(value)}
            />
            </span>
            <span className='user-vaccin-details'>
            {userVaccinationList?
            <table><tbody>
                <tr>
                    <th className='plus-col'></th>
                    <th>מספר חיסון</th>
                    <th>תאריך קבלת חיסון</th>
                    <th>שם היצרן</th>
                </tr>
               

                {userVaccinationList.map(val => {
                    const oneVacData = vaccineTypesList.find(x => x.vaccinId === val.vaccinId)
                    {console.log("yy ",oneVacData)}
                    return <tr key={val.vaccinId} >
                        <td className='plus-col'></td>
                        <td>{oneVacData.vaccinName}</td>
                        <td>
                            <input
                                type="date"
                                value={moment(new Date(val.vaccinDate)).format('YYYY-MM-DD') }
                                disabled={parent == 'showData' ? true : false}
                                onChange={(e) => changeDataOfVaccine(e.target.value, val.vaccinId)}
                            />

                        </td>
                        <td>
                            <input
                                type='text'
                                value={val.manufacturerName} 
                                disabled={parent == 'showData' ? true : false}
                                onChange={(e)=>changeManufacturerNameOfVaccine(e.target.value, val.vaccinId )}
                                />
                        </td>
                    </tr>



                }

                )}
                 <tr className='plus-row'>
                    <td className='plus-col' >
                        {userVaccinationList.length >= 4 ||  parent == 'showData' ? null: <button className='add-row-btn' onClick={addRow}><AiOutlinePlus/></button> }
                    </td>
                </tr>

            </tbody></table>:null}




            




            
            {userData == null ? <button className='btn' onClick={addNewUser} >שמור</button> : null}
            {parent == 'editData' ? <button className='btn'>עדכן</button> : null}
            </span>
        </div>
    )
}

export default User