import React, { useEffect, useState } from 'react'
import cookie from 'cookie'
import { useRouter } from 'next/router';
import axios from 'axios';
import { Spin } from 'antd';



const EditEvent = ({post}) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: post.title,
    description: post.description,
    location: post.location ,
    eventDate: post.eventDate ,
    from:post.duration.from  ,
    to: post.duration.to ,
    name: post.organizer.name ,
    contact: post.organizer.contact ,
    department:post.organizer.department  ,
    category: post.category ,
    cost:post.cost ,
    deadline:post.deadline,
    banner:"",
    socialMedia:post.socialMedia  ,
  })
  const [spinner, setSpinner] = useState(false)



  const handleSubmit = async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token'); // get token from local storage

    setSpinner(true)
    const {title, description, location,eventDate,from,to,name,contact,department,category,cost,banner,socialMedia} = formData
   

    if(!from || !to || !banner || !eventDate){
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

      
      const res = await axios.put(`https://upshot.onrender.com/api/v1/event/${post._id}`, apiEventData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });

      const evu = res.data

      if(evu.success==true){
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


  // console.log(eventDetails)
  return (
    <div className="create_event">
      <div className="create_event_heading pt-32">
        <h1 className="text-green-500 font-extrabold">EDIT AN EVENT</h1>

        <div className="form_create_event flex justify-center mt-20">
          <form onSubmit={handleSubmit} className="flex w-full h-full flex-col items-center auth_form">

            <input value={formData.title}   className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="title" placeholder='Title' type="text" onChange={handleChange} />

            <textarea value={formData.description}  className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="description" placeholder='Description' type="text" onChange={handleChange} />

            <input value={formData.location}  className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="location" placeholder='Location' type="text" onChange={handleChange} />

            <input value={formData.eventDate}  className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="eventDate" placeholder='Event Date' type="date" onChange={handleChange} />

            <input value={formData.name}  className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="name" placeholder='Organizer Name' type="text" onChange={handleChange} />

            <input value={formData.contact}  className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="contact" placeholder='Organizer Contact' type="number" onChange={handleChange} />

            <input value={formData.department}  className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="department" placeholder='Organizer Department' type="text" onChange={handleChange} />
            
            <input value={formData.category}  className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="category" placeholder='Category' type="text" onChange={handleChange} />

            <div className="fromto flex">
              <input  value={formData.from} className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="from" placeholder='Event Date' type="date" onChange={handleChange} />
              
              <input value={formData.to}  className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="to" placeholder='Event Date' type="date" onChange={handleChange} />
            </div>

            <input value={formData.cost}  className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="cost" placeholder='Cost' type="number" onChange={handleChange} />
       
            <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="banner" placeholder='Banner' type="file" onChange={handleChange} />

            <input value={formData.socialMedia}  className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="socialMedia" placeholder='Social Media' type="text" onChange={handleChange} />


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

export default EditEvent

export async function getServerSideProps(context){
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const token = cookies.token;

    const eventId = context.params.id

    const options = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const res = await axios.get(`https://upshot.onrender.com/api/v1/event/${eventId}`,options)
    const event = res.data.event

    return {
      props : {
        post : event
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


