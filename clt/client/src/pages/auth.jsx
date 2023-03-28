import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'antd';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import {ips,ipsevent} from '../../assets'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useUserContext } from '../../context/userContext.js'
import Cookies from 'js-cookie';

const initialState = {
  name : '',
  email : '',
  password : '',
  role : 'student',
  photo : '',
}

const auth = () => {
  const introImgRef = useRef()
  const introTitleRef = useRef()
  const formRef = useRef()
  const introsec2Ref = useRef()
  const router = useRouter();
  const routeName = router.pathname;


  const introImg2Ref = useRef()
  const introsec3Ref = useRef()

  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const {user,userToken, login, logout, register} = useUserContext()

  useEffect(()=>{
      const token = localStorage.getItem('token'); // get token from local storage
      const user = JSON.parse(localStorage.getItem('user')); // get user data from local storage

      if(routeName==="/auth"){
        if(token && user){
          router.push('/');
        }
      }
        gsap.registerPlugin(ScrollTrigger)
        const mainHeading = introTitleRef.current
        const form = formRef.current
        const introtitle = introsec2Ref.current
        const introsec3 = introsec3Ref.current
        const introImg2 = introImg2Ref.current


      gsap.fromTo(introImgRef.current, {
        filter: "blur(10px)",
      }, {
        duration: 2.5,
        ease: "circ.out",
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: introtitle,
          scrub: 1,
          start: "top 80%", 
          end: "center center",
        }
      })

      gsap.fromTo(introsec3, {
        filter: "blur(10px)",
      }, {
        duration: 2.5,
        ease: "circ.out",
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: introsec3,
          scrub: 1,
          start: "top 80%", 
          end: "center center",
        }
      })

      gsap.fromTo(mainHeading,{
        filter: "blur(10px)",
          x: "-100%"
      }, {
        duration: 2.5,
        ease: "circ.out",
        x: 0,
        filter: "blur(0px)",
      })

      gsap.fromTo(form,{
        opacity : 0,
        duration: 2,
        ease: 'power2.out',
      },{
        opacity : 1,
        duration: 2,
      })

      gsap.fromTo(introtitle, {
        filter: "blur(10px)",
          x: "-100%"
      }, {
        duration: 2.5,
        ease: "circ.out",
        x: 0,
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: introtitle,
          scrub: 1,
          start: "top 80%", 
          end: "center center",
        }
      });

      gsap.fromTo(introImg2, {
        filter: "blur(10px)",
          x: "-100%"
      }, {
        duration: 2.5,
        ease: "circ.out",
        x: 0,
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: introImg2,
          scrub: 1,
          start: "top 80%", 
          end: "center center",
        }
      });
  
      
  
  },[])


  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {email,password, name, role, photo} = formData
    if(isSignUp){
      const data = await login(email, password)
      if(data.token!==null){
          Cookies.set('token', data.token,{ expires: 7 });
          Cookies.set('user', data.user,{ expires: 7 });
          localStorage.setItem('token', data.token); // store token in local storage
          localStorage.setItem('user', JSON.stringify(data.user)); // store user data in local storage
          router.push('/')
      }
    }else{
      const data = await register(name, email, password, role, photo)
      if(data.token!==null){
        Cookies.set('token', data.token,{ expires: 7 });
        Cookies.set('user', data.user,{ expires: 7 });
        localStorage.setItem('token', data.token); // store token in local storage
        localStorage.setItem('user', JSON.stringify(data.user)); // store user data in local storage
        router.push('/')
      }
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
    <div className="auth w-full">
      <section className="auth_intro_section w-full h-[100vh]">
        <Row className="w-full h-full auth_img_row">
          <Col xl={12} md={12} sm={24} xs={24} className="flex justify-center items-center">
              <div className="auth_img flex justify-center items-center ml-3 img_res">
                <div className="appTitle" ref={introTitleRef}>UPSHOT EVENT MANAGER</div>
              </div>
          </Col>

          <Col xl={12} md={12} sm={24} xs={24} className="auth_form_row">
            <div className="form w-full flex justify-center items-center h-full form_res">
              <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col items-center auth_form">
                {isSignUp ? (
                  <div className="flex flex-col items-center">
                    <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="email" placeholder='Enter Your Email Address' type="email" onChange={handleChange} />
                    <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="password" placeholder='Enter your password' type="password" onChange={handleChange} />
                  </div>
                ):(
                  <>
                    <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="email" placeholder='Enter Your Email Address' type="email" onChange={handleChange} />
                    <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="password" placeholder='Enter your password' type="password" onChange={handleChange} />
                    <input className="bg-transparent w-full text-white mt-3 font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" name="name" placeholder='Enter Your Full Name' type="text" onChange={handleChange} />
                    <select className="bg-[#4a4a4a2e] w-full bg-opacity-80 text-white font-semibold text-lg p-3 auth_inp rounded-xl shadow-md appearance-none mt-3" name="role" onChange={handleChange}>
                      <option className="auth_role_options text-slate-600" value="student">Student</option>
                      <option className="auth_role_options text-slate-600" value="teacher">Teacher</option>
                      <option className="auth_role_options text-slate-600" value="organizer">Organizer</option>
                    </select>

                    <input type="file" className="bg-transparent mt-3 w-full text-white font-semibold text-[1.1rem] p-3 auth_inp rounded-xl" onChange={handleChange} name="photo" />
                  </>
                )}


                <button type='submit' className="w-full submit_btn h-[40px] mt-4 btn_auth bg-[#202020a5] text-green-400 rounded-xl">
                  {!isSignUp ? "SignUp" : "Login"}
                </button>

                <div className="text-white cursor-pointer mt-4" onClick={()=>setIsSignUp(prev=>!prev)}>
                  {!isSignUp ? "Already signed up - Login" : "Sign up"}
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </section>

      <section className="section_info1 w-full h-[80vh]">
        <Row className="w-full h-full">
          <Col className="w-full h-full lflex justify-center items-center" xl={12} md={12} sm={24} xs={24}>
              <div ref={introsec2Ref} className="auth_about_event w-full h-full flex flex-col justify-center items-center">
                  <div className="auth_event_title text-slate-100">
                    UPSHOT - IPS Academy Event Manager.
                  </div>
                  <div className="auth_event_desc text-[1.1rem] mt-4 text-slate-400">
                    Keep yourself updated with all the events in our collage.
                  </div>
              </div>
          </Col>
          <Col className="w-full h-full flex justify-center items-center" xl={12} md={12} sm={24} xs={24}>
              <div ref={introImgRef} className="event_img flex justify-center items-center">
                  <Image 
                    src={ipsevent}
                    alt="Ips Event"
                    className="object-cover w-full h-full rounded-2xl"
                  />
              </div>
          </Col>
        </Row>
      </section>



      <section className="section_info1 w-full h-[80vh]">
        <Row className="w-full h-full">
        <Col className="w-full h-full flex justify-center items-center" xl={12} md={12} sm={24} xs={24}>
              <div ref={introImg2Ref} className="event_img flex justify-center items-center">
                  <Image 
                    src={ips}
                    alt="Ips Event"
                    className="object-cover w-full h-full rounded-2xl"
                  />
              </div>
          </Col>
          <Col className="w-full h-full lflex justify-center items-center" xl={12} md={12} sm={24} xs={24}>
              <div ref={introsec3Ref} className="auth_about_event w-full h-full flex flex-col justify-center items-center">
                  <div className="auth_event_title text-slate-100">
                    What You Can Do
                  </div>
                  <div className="auth_event_desc text-[1.1rem] mt-4 text-slate-400">
                    Student's & Teachers can view event, Organizers can Create, Update, Delete Events
                  </div>
              </div>
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default auth





