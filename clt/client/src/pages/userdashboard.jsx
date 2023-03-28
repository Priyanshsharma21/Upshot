import React, { useEffect, useState } from 'react'
import cookie from 'cookie'
import Link from 'next/link'


const userdashboard = () => {
  const [userDetails, setUserDetails] = useState([])


  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user')); // get user data from local storage
    setUserDetails(user)
  },[])



  return (
    <div className='userDashboard w-full min-h-[100vh] pt-32'>
      <div className="userBasic flex pl-10">
        <div className="img_user w-[200px] h-[300px]">
          <img className="object-cover w-full h-full rounded-3xl" src={userDetails?.photo?.secure_url} alt={userDetails?.name} />
        </div>
        <div className="user_information ml-20">
          <div className="name_of_user text-white">{userDetails?.name}</div>
          <div className="email_of_user text-slate-300">{userDetails?.email}</div>
          <div className="role_of_user text-slate-300">{userDetails?.role}</div>
          <Link href={`/user/${userDetails?._id}`}>
          <button className="edit_me">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default userdashboard


