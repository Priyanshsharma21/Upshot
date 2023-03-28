import { Navbar } from '@/components'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Spin } from 'antd';

const event = {
  title: "",
  description: "",
  location: "",
  eventDate: "",
  from: "",
  to: "",
  name: "",
  contact: "",
  department: "",
  category: "",
  cost: 0,
  deadline: "",
  banner: "",
  socialMedia: "",
  user : null,
}

const Event = () => {
  const [formData, setFormData] = useState(event)
  const [spinner, setSpinner] = useState(false)
  const router = useRouter();


  const handleSubmit = async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token'); // get token from local storage

    setSpinner(true)
    const {title, description, location,eventDate,from,to,name,contact,department,category,cost,banner,socialMedia} = formData
   

    if(!title || !description || !location || !from || !to || !name || !contact || !department || !category || !cost || !banner || !socialMedia || !eventDate){
      alert("Please Enter all the details")
      return
    }

    const apiEventData = {
      title: title,
      description: description,
      location: location,
      eventDate: eventDate,
      duration: {
          from: from,
          to: to
      },
      organizer: {
          name: name,
          contact: contact,
          department: department,
      },
      category: category,
      cost: cost,
      deadline: eventDate,
      banner: banner,
      socialMedia: socialMedia,
  }


      
      const res = await axios.post('http://localhost:8000/api/v1/event', apiEventData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });

      const event = res.data

      if(event.success==true){
        setSpinner(false)
        router.push('/')
      }



  }

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === 'banner') {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = () => {
        setFormData({ ...formData, banner: reader.result });
      };
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };




  return (
    <div className="create_event">
      <div className="create_event_heading pt-32">
        <h1 className="text-green-500 font-extrabold">CREATE AN EVENT</h1>

        <div className="form_create_event flex justify-center mt-20">
          <form onSubmit={handleSubmit} className="flex w-full h-full flex-col items-center auth_form">

            <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="title" placeholder='Title' type="text" onChange={handleChange} />

            <textarea className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="description" placeholder='Description' type="text" onChange={handleChange} />

            <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="location" placeholder='Location' type="text" onChange={handleChange} />

            <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="eventDate" placeholder='Event Date' type="date" onChange={handleChange} />

            <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="name" placeholder='Organizer Name' type="text" onChange={handleChange} />

            <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="contact" placeholder='Organizer Contact' type="number" onChange={handleChange} />

            <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="department" placeholder='Organizer Department' type="text" onChange={handleChange} />
            
            <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="category" placeholder='Category' type="text" onChange={handleChange} />

            <div className="fromto flex">
              <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="from" placeholder='Event Date' type="date" onChange={handleChange} />
              
              <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="to" placeholder='Event Date' type="date" onChange={handleChange} />
            </div>

            <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="cost" placeholder='Cost' type="number" onChange={handleChange} />
       
            <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="banner" placeholder='Banner' type="file" onChange={handleChange} />

            <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="socialMedia" placeholder='Social Media' type="text" onChange={handleChange} />


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
    </div>
  )
}

export default Event