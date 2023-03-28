import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../context/userContext';
import Cookies from 'js-cookie';
import { AiFillCaretDown,AiFillCaretUp } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'

const Navbar = () => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState()
    const [isUserHover, serIsUserHover] = useState(false)
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [search, setSearch] = useState('')
    const routeName = router.pathname;
    const {logout} = useUserContext()

  
    useEffect(()=>{
      const token = localStorage.getItem('token'); // get token from local storage
      const user = JSON.parse(localStorage.getItem('user')); // get user data from local storage
      if(routeName==='/'){
        if(token && user){
          setUserInfo(user)
        }
        else{
          router.push('/auth');
        }
      }

    },[])


    const handleScroll = () => {
      const navbar = document?.querySelector('nav');
      const scrolled = window.scrollY;
    
      if (scrolled > 0) {
        if(navbar!==null){
          navbar.style.background = '#000000'; // change to black background
        }
      } else {
        if(navbar!==null){
          navbar.style.background = 'transparent'; // change to transparent background
        }
      }
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const handleLogout = async(e)=>{
      e.preventDefault()
      const res = await logout()
      if(res.data.success===true){
        router.push('/auth')
      }
    }
    

    const handleMouseOver = ()=>{
      serIsUserHover(true)
    }

    const handleMouseOut = ()=>{
      serIsUserHover(false)
    }

    const handleSearchSubmit = async(e)=>{
      e.preventDefault()
      router.push(`/search?q=${search}`)
    }


  return (
    <nav className="w-full nav h-[60px] items-center fixed z-10 top-0 flex justify-between">
        <div className="logo text-[1.5rem] font-semibold  ml-3">
          <Link className="logo_text" href="/"><span className="text-red-600">UP</span>SHOT</Link>
        </div>
        <div className="nav_right_sec flex items-center">
        {routeName !== '/auth' && (
          <>
          {showSearchBar ? (
            <form className="searchnav relative mr-5" onSubmit={handleSearchSubmit}>
            <FaSearch onClick={()=>setShowSearchBar(false)} className='text-slate-300 cursor-pointer absolute top-[6.3px] left-[6.3px] text-[1rem]' />
            <input className='search_inpt' placeholder='Search Events' type="text" onChange={(e)=>setSearch(e.target.value)} />
          </form>
          ):(
            <div className="search_icon mr-10 font-bold">
            <FaSearch onClick={()=>setShowSearchBar(true)} className='text-slate-300 cursor-pointer text-[1.4rem]' />
          </div>
          )}
          </>
        )}
        
          <div className="show_me_moves" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
          {routeName !== '/auth' && (
            <div className="flex items-center">
            <div className="nav_user_img w-[45px] cursor-pointer h-[45px]" >
                <img
                  className="w-full flex justify-between items-center h-full object-cover rounded-xl"
                  src={userInfo?.photo?.secure_url}
                  alt={userInfo?.name}
                  title={userInfo?.name}
                />
            </div>
            <div className="dropIcons ml-2">
                  {isUserHover ? <AiFillCaretUp className='text-white'/>  : <AiFillCaretDown className='text-white'/> }
            </div>

              {isUserHover ? (<>
                <div onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} className="nav_dropdown flex items-start flex-col bg-[#3f3f3fa0]">
                <Link href={`/userdashboard`} className='mt-3 text-white'>
                  User Profile
                </Link>
                <div onClick={handleLogout} className="logout_text mt-3 text-[1.1rem] cursor-pointer  text-white flex justify-between items-center">Logout</div>
              </div>
              </>):(
                <></>
              )}
            </div>
          )}
          </div>
          {routeName !== '/auth' && (
            <>
              {userInfo?.role === "organizer" &&(
              <div className="createe cursor-pointer w-[50px] h-[50px] rounded-full flex justify-center items-center ml-4 mr-6 font-semibold text-white">
                <div className="add text-[2rem]">
                  <Link href="/create/event">
                    +
                  </Link>
                </div>
              </div>
              )}
            </>
          )}
        </div>
    </nav>
  )
}

export default Navbar