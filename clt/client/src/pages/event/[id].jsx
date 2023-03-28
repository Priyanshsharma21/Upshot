import axios from 'axios'
import React, { useEffect, useState } from 'react'
import cookie from 'cookie'
import moment from 'moment'
import { AiOutlineHeart,AiFillHeart } from 'react-icons/ai'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'

const EventDetails = ({event}) => {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(event.likes?.length);
  const [userObj, setUserObj] = useState()
  const router = useRouter();

  const from = moment(event.duration.from).format('MMM Do YYYY, h:mm a');
  const to = moment(event.duration.to).format('MMM Do YYYY, h:mm a');

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user')); // get user data from local storage
    setUserObj(user)
    event?.likes?.map((like)=>{
      if(like.user===user._id){
        setLiked(true);
      }
    })
  },[liked]);


  const handleLike = async (e) => {
    e.preventDefault();
    const eventId = event._id;
    const token = localStorage.getItem('token'); // get token from local storage
    const options = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      const res = await axios.get(`https://upshot.onrender.com/api/v1/event/likes/${eventId}`,options);
      const updatedLikes = res.data.likes; // assuming the API response includes the updated list of likes
      setLiked(prev=>!prev);
      console.log(res.data)
      setLikesCount(updatedLikes?.length);
    } catch (err) {
      console.log(err);
    }
  };


  const handleDelete = async()=>{
    try {
      const token = localStorage.getItem('token'); // get token from local storage
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.delete(`https://upshot.onrender.com/api/v1/event/${event._id}`,options)

      console.log(res.data)

      if(res.data.success===true){
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="eventDetails">
    {/* Banner */}
    <div 
      className="relative bg_details md:h-[40vh] bg-cover bg-center" 
      style={{ backgroundImage: `url(${event.banner.secure_url})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center">{event.title}</h1>
      </div>
    </div>

    {/* Description */}
    <div className="my-8 px-4 md:px-8 flex justify-between">
      <p className="text-base md:text-lg max-w-[70%] leading-7 text-gray-400">{event.description}</p>
      {event?.user===userObj?._id &&(
        <div className="btns flex justify-between">
          <Link href={`/event/edit/${event._id}`} className="bg-white text-black font-semibold pl-5 pr-5 pt-2 pb-2 rounded-3xl m-2">Edit</Link>
          <button onClick={handleDelete} className="bg-white text-black font-semibold pl-5 pr-5 pt-2 pb-2 rounded-3xl m-2">Delete</button>
        </div>
      )}
    </div>

    <div className="like_btn_insta">
      <div class="like-container">
        <button class="like-button flex flex-col" onClick={handleLike}>
            {liked ? (
          <span class="heart-icon" >
              <svg viewBox="0 0 32 29.6" xmlns="http://www.w3.org/2000/svg"><path d="M30.5 5.5c-1.4-2.4-4-4-6.8-4-2.6 0-4.9 1.4-6.2 3.5-1.3-2.1-3.6-3.5-6.2-3.5-2.8 0-5.3 1.6-6.8 4-2.9 5-1.2 10.2 2.2 13.2l10.6 10.6c.4.4 1 .4 1.4 0l10.6-10.6c3.4-3 5.1-8.2 2.2-13.2z"/></svg>
          </span>

            ):(
          <span class="heart-icon" >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="white">
                  <path fill="none" d="M12,20.5l-9.192-9.192c-2.343-2.343-2.343-6.142,0-8.485c2.343-2.343,6.142-2.343,8.485,0l0,0l0,0l0,0l0,0L12,4.828l1.707-1.707c2.343-2.343,6.142-2.343,8.485,0c2.343,2.343,2.343,6.142,0,8.485l0,0L12,20.5z"/>
              </svg>
          </span>

            )}
          <span class="like-text mt-3 text-slate-200">{likesCount}</span>
        </button>
      </div>
      </div>

    {/* Details Table */}
    <div className="my-8 px-4 md:px-8">
      <table className="table-auto w-full border-collapse">
        <tbody>
          <tr>
            <td className="font-medium text-gray-500 py-2">Location</td>
            <td className="text-gray-500 py-2">{event.location}</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-500 py-2">Event Date</td>
            <td className="text-gray-500 py-2">{from} - {to}</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-500 py-2">Category</td>
            <td className="text-gray-500 py-2">{event.category}</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-500 py-2">Cost</td>
            <td className="text-gray-500 py-2">{event.cost}</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-500 py-2">Deadline</td>
            <td className="text-gray-500 py-2">{moment(event.deadline).format('MMM Do YYYY, h:mm a')}</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-500 py-2">Organizer Name</td>
            <td className="text-gray-500 py-2">{event.organizer.name}</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-500 py-2">Organizer Contact</td>
            <td className="text-gray-500 py-2">{event.organizer.contact}</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-500 py-2">Organizer Department</td>
            <td className="text-gray-500 py-2">{event.organizer.department}</td>
          </tr>
        </tbody>
      </table>

      <div className="socialMedia mt-5">
        <a href={event?.socialMedia} target="_blank" rel="noopener noreferrer">Social Media</a>
      </div>

   
    </div>
  </div>
  )
}

export default EventDetails

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
        event : event
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
