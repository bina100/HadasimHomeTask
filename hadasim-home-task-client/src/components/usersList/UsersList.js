import React, { useState, useEffect } from 'react'
import { MdModeEdit } from 'react-icons/md';
import { RiDeleteBin5Line, RiSwapLine } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import User from '../user/User'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import SweetAlert from 'sweetalert';

const UsersList = () => {
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        getUserList();
    }, [])

    useEffect(() => {
        getUserList();
    }, [usersList])

    //  function get users list data from database
    const getUserList = () => {
        Axios.get('http://localhost:3001/getUsersList').then((response) => {
            console.log("success get users list", response)
            setUsersList(response.data)
        })
    }

    //  function delete all users data from database
    const deleteUser = (id) => {
        // (async ()=> {
        // const response = await
        Axios.post('http://localhost:3001/deleteUser',
            { id: id },
        ).then(() => {
            console.log("success delete user")

        });
        Axios.post('http://localhost:3001/deleteDataVac',
            { id: id },
        ).then(() => {
            console.log("success delete users data vaccine")
            SweetAlert({text:"הלקוח נמחק מהמערכת", timer:1500} );
        });
        
        // })();
    }

    return (
        <div className='users-list'>
            <span >
                <Link
                    to={`/user`}
                    state={{ userData: null }}
                    className='add-new-user'
                ><AiOutlinePlus /></Link>
            </span>
            {usersList ?
                <table><tbody>
                    <tr>
                        <th>שם פרטי</th>
                        <th>שם משפחה</th>
                        <th>מספר זהות</th>
                        <th></th>
                    </tr>
                    {usersList.map(user => (
                       
                            <tr key={user.Id} >
 <Link
                            to={`/user`}
                            state={{ userData: user, parent: 'showData' }}
                        >
                                <td>
                                    {user.firstName}
                                </td>

                                <td>{user.lastName}</td>

                                <td>{user.userId}</td>
                                </Link>

                                <td className='edit-and-delete'>
                                    <Link
                                        className='icon'
                                        to={`/user`}
                                        state={{ userData: user, parent: 'editData' }}
                                    ><MdModeEdit /></Link>
                                    <button className='icon' onClick={() => deleteUser(user.id)}><RiDeleteBin5Line /></button></td>

                            </tr>
                    ))}
                </tbody></table>

                : <h2>אין חברים ברשימה</h2>
            }
        </div>
    )
}

export default UsersList

