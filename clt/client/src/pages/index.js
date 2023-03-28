import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/userContext.js'
import { EventCard, Navbar } from '../components'
import { Col, Row } from 'antd';
import Cookies from 'js-cookie';
import { parse } from 'cookie';



export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState([])
  const routeName = router.pathname;
  const {user,userToken, logout} = useUserContext()


  useEffect(()=>{
    if(routeName==='/'){
      const token = localStorage.getItem('token'); // get token from local storage
      const user = JSON.parse(localStorage.getItem('user')); // get user data from local storage

      if(token && user){
        getEvents()
      }
      else{
        router.push('/auth');
      }
    }
  },[])


  const getEvents = async()=>{
    try {
      const token = localStorage.getItem('token'); // get token from local storage

      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const res = await axios.get(`http://localhost:8000/api/v1/event`,options)
      const events = res.data.events
      setEvents(events)
    } catch (error) {
      console.log(error)
    }

}


  return (
    <div className="min-h-[200vh] home">
    
      <div className="events pt-40">
        <Row  className='events_box flex justify-evenly'>
          {events?.map((event,i)=>(
            <Col xs={24} sm={12} lg={6} className='eventCard mt-5'>
                <EventCard key={event._id} post={event} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}


// export async function getStaticProps() {
//   try {
//     const token = Cookies.get('token');
//     const res = await axios.get(`http://localhost:8000/api/v1/event`,{
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     const events = res.data.events


//     return {
//       props: {
//         events : events,
//       },
//     }
//   } catch (error) {
//     console.error(error)
//     return {
//       props: {
//         events: [],
//       },
//     }
//   }
// }