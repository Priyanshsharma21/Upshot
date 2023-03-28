import React, { useState } from 'react'
import cookie from 'cookie'
import axios from 'axios'
import { Spin } from 'antd'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const userdetails = ({user}) => {
  const [formData, setFormData] = useState({
    name : user.name,
    email : user.email,
    photo : "",
  })
  const [spinner, setSpinner] = useState(false)
  const router = useRouter()


  const handleSubmit = async(e)=>{
    e.preventDefault();
    setSpinner(true)
    const token = localStorage.getItem('token'); // get token from local storage


    try {
      const res = await axios.put(`https://upshot.onrender.com/api/v1/userdashboard/update`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    });

  const newUser = res.data.user
  setSpinner(false)
  Cookies.set('user', newUser,{ expires: 7 });
  localStorage.setItem('user', JSON.stringify(newUser)); // store user data in local storage

  if(res.data.success==true){
    router.push('/userdashboard')
  }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === 'photo') {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = () => {
        setFormData({ ...formData, photo: reader.result });
      };
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="userEdit pt-32">
        <h1 className="text-green-500 font-extrabold ml-5 text-[2.5rem]">EDIT YOUR PROFILE</h1>
        <div className="form_create_event flex justify-center mt-20">
          <form onSubmit={handleSubmit} className="flex w-full h-full flex-col items-center auth_form">
              <input value={formData?.email} className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="email" placeholder='Enter Your Email Address' type="email" onChange={handleChange} />
                    
              <input value={formData?.name} className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="name" placeholder='Enter Your Full Name' type="text" onChange={handleChange} />
            
              <input type="file" className="bg-transparent mt-3 w-full text-white font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" onChange={handleChange} name="photo" />

              <button type='submit' className="w-full submit_btn h-[40px] mt-4 btn_auth bg-[#202020a5] text-yellow-400 rounded-xl">
                  {spinner ? (
                      <Spin />
                  ):(
                      <>Submit</>
                  )}
              </button>
          </form>
        </div>
    </div>
  )
}

export default userdetails

export async function getServerSideProps(context){
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const token = cookies.token;

    const options = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const res = await axios.get(`https://upshot.onrender.com/api/v1/userdashboard`,options)
    const user = res.data.user

    return {
      props : {
        user : user
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props : {
        error : "Failed to load event data"
      }
    }
  }
}
