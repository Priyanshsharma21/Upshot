import { createContext, useContext, useState } from 'react';
import axios from 'axios'

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null)

  const login = async (email, password) => {
    if (!email || !password) return console.log("Enter Email & Password");
  
    const userData = {
      email,
      password,
    };
  
    const res = await axios.post("https://upshot.onrender.com/api/v1/login", userData);
  
    const data = await res.data;
    setUser(data.user);
    setUserToken(data.token);
    return data;
  };
  


  const logout = async () => {
    const res = await axios.get("https://upshot.onrender.com/api/v1/logout");
    setUser(null);
    setUserToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return res;
  };
  


  const register = async (name, email, password, role, photo) => {
    if (!name || !email || !password || !role || !photo)
      return console.log("Enter all details");
  
    const formData = {
      name,
      email,
      password,
      role,
      photo,
    };
  
    const res = await axios.post("https://upshot.onrender.com/api/v1/signup", formData);
    const data = await res.data;
    setUser(data.user);
    setUserToken(data.token);
    return data;
  };






  return (
    <AuthContext.Provider value={{ user, login, logout, register,userToken,setUser, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useUserContext = () => useContext(AuthContext);