import React, { useState, useEffect } from 'react'
import Input from '../Input'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import Axios from 'axios'


const UserStatus = ({ userStatusList, setUserStatusList }) => {
    const location = useLocation();
    const { userData, parent } = location.state;
    const [sick, setSick] = useState("");
    const [healthy, setHealthy] = useState("");
    useEffect(() => {
        if (userData != null) {
            getUserStatusList()
        }
    }, [])

    useEffect(() => {
        if (userStatusList.length == 2) {
            setSick(userStatusList.find(x => x.status === 1) ? userStatusList.find(x => x.status === 1).statusDate : "")
            setHealthy(userStatusList.find(x => x.status === 0) ? userStatusList.find(x => x.status === 0).statusDate : "")
        }
        else if (userStatusList.find(x => x.status === 0)) {
            setSick(userStatusList.find(x => x.status === 0).statusDate)
        }
        else if (userStatusList.find(x => x.status === 1)) {
            setSick(userStatusList.find(x => x.status === 1).statusDate)
        }
    }, [userStatusList])


    const getUserStatusList = async () => {
        try {
            const data = {
                id: userData.id,
            }
            const fetchData = await Axios.post('http://localhost:3001/getUserStatusList', data)
            console.log("success get user status list", fetchData.data)
            setUserStatusList(fetchData.data)

        } catch (error) {
            console.log(error)
        }
    }

    const setSickStatus = (value) => {
        setSick(value)
        const userStatus = [...userStatusList]
        let userSick = {}
        userSick = userStatus.find(x => x.status === 1)

        if (userSick) {
            userSick.statusDate = value
        } else {
            userStatus.push({ id: userData ? userData.id : null, status: 1, statusDate: value })
        }
        setUserStatusList(userStatus)

    }

    const setHealthyStatus = (value) => {
        setHealthy(value)
        const userStatus = [...userStatusList]
        let userHealth = {}
        userHealth = userStatus.find(x => x.status === 0)

        if (userHealth) {
            userHealth.statusDate = value
        } else {
            userStatus.push({ id: userData ? userData.id : null, status: 0, statusDate: value })
        }
        setUserStatusList(userStatus)

    }

    return (
        <div>
            <Input
                label="חלה בתאריך"
                type="date"
                disabled={parent == 'showData' ? true : false}
                value={moment(new Date(sick)).format('YYYY-MM-DD')}
                inputChange={(value) => setSickStatus(value)}
            />
            <Input
                label="החלים בתאריך"
                type="date"
                disabled={parent == 'showData' ? true : false}
                value={moment(new Date(healthy)).format('YYYY-MM-DD')}
                inputChange={(value) => setHealthyStatus(value)}
            />
        </div>
    )
}
export default UserStatus

