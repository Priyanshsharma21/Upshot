import React, { useEffect, useState } from 'react'
import cookie from 'cookie'
import axios from 'axios'
import { EventCard } from '@/components'
import { Col, Row } from 'antd'

const search = ({events,q}) => {
    const [filterEvents, setFilterEvents] = useState([])

    useEffect(() => {
      const result = q ? events.filter((event) => event.title.toLowerCase().includes(q.toLowerCase())) : events
      setFilterEvents(result)
    }, [events, q])
  
    console.log(filterEvents)

  return (
    <div className="search_main">
        <div className="events pt-40">
        <Row className='events_box flex justify-evenly'>
          {filterEvents?.map((event,i)=>(
            <Col xs={24} sm={12} lg={6} className='eventCard mt-5'>
                <EventCard key={event._id} post={event} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default search

export async function getServerSideProps(context){
    try {
    const query = context.query.q
    console.log(query)
      const cookies = cookie.parse(context.req.headers.cookie || '');
      const token = cookies.token;
  
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
  
      const res = await axios.get(`https://upshot.onrender.com/api/v1/event`,options)
      const events = res.data.events
  
      return {
        props : {
          events : events,
          q  : query
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
  