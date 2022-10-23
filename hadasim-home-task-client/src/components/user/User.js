import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Input from '../Input';
import Axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RiArrowGoBackLine } from 'react-icons/ri';
import SweetAlert from 'sweetalert2';
import UserStatus from './UserStatus';
import UserVaccine from './UserVaccine'


const User = () => {
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
    const [userStatusList, setUserStatusList] = useState([])
    const [vaccineTypesList, setVaccineTypesList] = useState([])

    useEffect(() => {
        getVaccineTypes()
        if (userData != null) {
            setFirstName(userData.firstName)
            setLastName(userData.lastName)
            setUserId(userData.userId)
            setAddress(userData.address)
            setDateOfBirth(userData.dateOfBirth)
            setPhone(userData.phone)
            setMPhone(userData.mPhone)
        }
    }, [])

    useEffect(() => {
        if (vaccineTypesList.length > 0 && userData != null) {
            getUserVaccine()
        }

    }, [vaccineTypesList])

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
                SweetAlert.fire({
                    icon: 'success',
                    text: "הנתונים נשמרו בהצלחה",
                    timer: 1500,
                    showConfirmButton: false,
                })
            });
        getIdUser()
    }

    //function get new user id to add vaccine user list and users status
    const getIdUser = async () => {
        try {
            const fetchData = await Axios.post('http://localhost:3001/getId', { userId: userId })
            console.log("success get id", fetchData.data)
            const id = fetchData.data[0].id
            setVaccineList(id)
            updateUserStatusList(id)
        } catch (error) {
            console.log(error)
        }
    }

    //function update users vaccine list
    const setVaccineList = (id) => {
        const userVaccine = [...userVaccinationList]
        userVaccine.map(x => x.id = id)
        userVaccine.map(x => x.vaccinDate = moment(new Date(x.vaccinDate)).format('YYYY-MM-DD'))
        setUserVaccinationList(userVaccine)
        Axios.post('http://localhost:3001/setVaccineList', { userVaccinationList: userVaccinationList })
            .then((response) => {
                console.log("success set vaccine list", response)
            })
    }

    const setDateFormat = (userStatusList, id) => {
        const statusList = [...userStatusList]
        statusList.map(x => x.id = id)
        statusList.map(x => x.statusDate = moment(new Date(x.statusDate)).format('YYYY-MM-DD'))
        setUserStatusList(statusList)
    }

    //function update users status list
    const updateUserStatusList = (id) => {
        setDateFormat(userStatusList, id)
        const data = {
            id: id,
            userStatusList: userStatusList
        }
        Axios.post('http://localhost:3001/updateUserStatusList', data
        ).then((res) => {
            console.log("success get user status list", res.data)
        });
    }

    //function update user data
    const setUserData = () => {
        const data = {
            id: userData.id,
            firstName: firstName,
            lastName: lastName,
            userId: userId,
            address: address,
            dateOfBirth: moment(new Date(dateOfBirth)).format('YYYY-MM-DD'),//dateOfBirth,
            phone: phone,
            mPhone: mPhone,
        }
        Axios.post('http://localhost:3001/setUserData', data
        ).then(() => {
            console.log("success update user data")
        });
    }

    //function update user all data
    const updateData = () => {
        setUserData()
        setVaccineList(userData.id)
        updateUserStatusList(userData.id)
        SweetAlert.fire({
            icon: 'success',
            text: "הנתונים עודכנו בהצלחה",
            timer: 1500,
            showConfirmButton: false,
        })
    }

    //function get the list of vaccine types
    const getVaccineTypes = async () => {
        try {
            const fetchData = await Axios.get('http://localhost:3001/getVaccineTypes')
            setVaccineTypesList(fetchData.data)
        } catch (error) {
            console.log(error)
        }
    }


    //function get the list of vaccine of user
    const getUserVaccine = async (e) => {
        const post = { id: userData.id }
        try {
            const res = await Axios.post('http://localhost:3001/getUserVaccine', post)
            console.log("success get vaccine types", res)
            setUserVaccinationList(res.data)

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='user'>
            <span className='back-to-users-list' >
                <Link
                    to={`/`}
                ><RiArrowGoBackLine /></Link>
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
                    value={moment(new Date(dateOfBirth)).format('YYYY-MM-DD')}
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
                {userVaccinationList.length > 0 || parent != 'showData' ?
                    <UserVaccine userVaccinationList={userVaccinationList} setUserVaccinationList={setUserVaccinationList} vaccineTypesList={vaccineTypesList} /> :
                    <h3>אין חיסונים להצגה</h3>}

                <UserStatus userStatusList={userStatusList} setUserStatusList={setUserStatusList} />

                {userData == null ? <button className='btn' onClick={() => addNewUser()} >שמור</button> : null}
                {parent == 'editData' ? <button className='btn' onClick={() => updateData()}>עדכן</button> : null}
            </span>
        </div>
    )
}

export default User