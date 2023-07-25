import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'




const Nav = () => {
  const nav = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get('http://localhost:8000/api/getUser', { withCredentials: true })
      .then(res => {
        // console.log(res.data)
        setUser(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const logout = (e) => {
    e.preventDefault()
    axios.get('http://localhost:8000/api/logout', { withCredentials: true })
      .then(res => {
        console.log(res)
        nav('/')
      })
      .catch(err => console.log(err))
  }




  return (
    <div className='sticky-top'>
      <nav className="navbar  bg-dark p-1 d-flex justify-content-between mb-5">
        <div className='bg-dark d-flex align-items-center'>
          <img className='bg-dark ms-3' src="https://i.gifer.com/origin/e0/e02ce86bcfd6d1d6c2f775afb3ec8c01_w200.gif" alt="spinning coin"  height={50}/>
          <h1 className=' bg-dark p-3'>CoinTracker</h1>
        </div>
        <div className='d-flex bg-dark'>
          <h4 className=' bg-dark p-3 '>{user.firstName} {user.lastName}</h4>
          <h4 className=' bg-dark p-3 ' style={{ cursor: 'pointer' }} onClick={logout}>Logout</h4>
        </div>
      </nav>
    </div>
  )
}

export default Nav