import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { AiOutlinePlus } from 'react-icons/ai';

const UserVaccine = ({ userVaccinationList, setUserVaccinationList, vaccineTypesList }) => {
    const location = useLocation();
    const { userData, parent } = location.state;

    const changeDataOfVaccine = (event, id) => {
        const userVaccine = [...userVaccinationList]
        userVaccine.find(x => x.vaccinId == id).vaccinDate = event
        setUserVaccinationList(userVaccine)
    }

    const changeManufacturerNameOfVaccine = (event, id) => {
        const userVaccine = [...userVaccinationList]
        userVaccine.find(x => x.vaccinId == id).manufacturerName = event
        setUserVaccinationList(userVaccine)
    }

    //function add vaccine to table
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
        <div>
            <table><tbody>
                <tr>
                    <th className='plus-col'></th>
                    <th>מספר חיסון</th>
                    <th>תאריך קבלת חיסון</th>
                    <th>שם היצרן</th>
                </tr>


                {userVaccinationList.map(val => {
                    const oneVacData = vaccineTypesList.find(x => x.vaccinId === val.vaccinId)
                    return <tr key={val.vaccinId} >
                        <td className='plus-col'></td>
                        <td>{oneVacData.vaccinName}</td>
                        <td>
                            <input
                                type="date"
                                value={moment(new Date(val.vaccinDate)).format('YYYY-MM-DD')}
                                disabled={parent == 'showData' ? true : false}
                                onChange={(e) => changeDataOfVaccine(e.target.value, val.vaccinId)}
                            />

                        </td>
                        <td>
                            <input
                                type='text'
                                value={val.manufacturerName}
                                disabled={parent == 'showData' ? true : false}
                                onChange={(e) => changeManufacturerNameOfVaccine(e.target.value, val.vaccinId)}
                            />
                        </td>
                    </tr>
                }

                )}
                <tr className='plus-row'>
                    <td className='plus-col' >
                        {userVaccinationList.length >= 4 || parent == 'showData' ? null : <button className='add-row-btn' onClick={addRow}><AiOutlinePlus /></button>}
                    </td>
                </tr>
            </tbody></table>
        </div>
    )
}
export default UserVaccine

