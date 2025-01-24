import React, { useEffect, useState } from 'react'
import { FaClipboardList } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa";
import { MdNotificationImportant } from "react-icons/md";
import { MdIncompleteCircle } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';


const Sidebar = () => {
    
    const dispatch = useDispatch();
    const history =useNavigate();
    const data = [
        {
            title: 'All Task',
            icon: <FaClipboardList />,
            link:"/"
        },
        {
            title: 'Complete Task',
            icon: <FaCheckDouble />,
            link:"/completetask"
        },
        {
            title: 'Incomplete Task',
            icon: <MdIncompleteCircle />,
            link:"/incompletetask"
        },
        {
            title: 'Important Task',
            icon: <MdNotificationImportant />,
            link:"/importanttask"
        }
    ];

    const Logout=()=>{
        localStorage.clear("id");
        localStorage.clear("token");
        dispatch(authActions.logout());
        history("/signup")
    }
   
    
    const [user, setUser] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("authToken");
                // if (!token) throw new Error("No token found");

                const response = await axios.get("http://localhost:8080/api/v2/log-in", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to fetch user data");
            }
        };

        fetchUser();
    }, []);




    return (

        <>
            <div className=' '>
                <h1 className='text-xl font-bold'>{user.user}</h1>
                <h1 className='m-1'>{user.email}</h1>
                <hr />
            </div>




            <div>
                <h1 className='font-bold'> Tasks</h1>
                <hr />
                {data.map((item, i) => (
                    <Link to={item.link} key={i}
                     className=' my-2 p-1 flex gap-2 items-center hover:bg-gray-400 cursor-pointer transition-all border rounded'>
                        {item.icon}{item.title}</Link>))}
            </div>

            <div>
                <button className='bg-gray-500 w-full border h-10 rounded-xl'onClick={Logout}>LogOut</button>
            </div>


        </>
    )
}

export default Sidebar