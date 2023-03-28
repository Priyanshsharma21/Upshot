import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import { AiOutlineLike,AiFillLike } from 'react-icons/ai'
import axios from 'axios';

const EventCard = ({post}) => {
    const { title, location, eventDate, category, cost, deadline,organizer,banner,postedAt,likes,_id } = post;
    const [likeActive, setLikeActive] = useState(false)
    const [likesCount, setLikesCount] = useState(likes?.length);
  
    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('user')); // get user data from local storage
      likes?.map((like)=>{
        if(like.user===user._id){
          setLikeActive(true);
        }
      })

    },[likesCount]);
  
    const handleLike = async (event, post) => {
      event.preventDefault();
      event.stopPropagation();
      const eventId = post._id;
      const user = JSON.parse(localStorage.getItem('user')); // get user data from local storage
      const token = localStorage.getItem('token'); // get token from local storage
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/event/likes/${eventId}`,options);
        const updatedLikes = res.data.likes; // assuming the API response includes the updated list of likes
        console.log(res.data)
        // setLikeActive((prev) => !prev);
        setLikesCount(updatedLikes?.length);
      } catch (err) {
        console.log(err);
      }
    };


  return (
        <Link href={`/event/${_id}`} className="w-full h-full rounded-3xl ">
            <div className="img w-full h-[200px]">
                <img className="object-cover w-full h-[200px] rounded-2xl"  alt={title} src={banner?.secure_url}/>
            </div>
            <div className="event_title text-white font-semibold mt-4 ml-2">
                {title}
            </div>

            <div className="event_subr2 flex justify-between mt-4">
                <div className="organizer ml-2 mmc text-slate-400 text-[0.9rem]">{organizer?.name}</div>
                <div className="category mr-2 text-slate-100 text-[0.9rem]">{category}</div>
            </div>

            <div className="event_date flex justify-between mt-4">
                <div className="ml-3 eve_date mmc text-slate-400 text-[0.9rem]">{moment(eventDate).format('D [Match] - HH:mm')}</div>

                <div className="mr-3 cost">{cost} ₹</div>
            </div>

            <div className="contact_likes flex justify-between mt-4">
                <div className="contact category mmc text-white ml-2">{organizer?.contact}</div>
                <div className=" text-white  mr-3" >
                <div className="like category flex mmc" onClick={(e) => handleLike(e, post)}>
                    {likeActive ? <AiFillLike /> : <AiOutlineLike />}
                </div>
                <div className="like_count mmc mt-1 font-semibold">
                    {likesCount}
                </div>
                </div>
                
            </div>
        </Link>
  )
}

export default EventCard