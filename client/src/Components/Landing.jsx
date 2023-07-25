import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Landing.css'


const Landing = () => {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errorsSign, setErrorsSign] = useState([])
  const [errorsLog, setErrorsLog] = useState([])


  const setAnimationName = (element, animationName) => {
    if (element) {
        element.style.animationName = animationName;
    }
};

  const login = e => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/login', {
      email,
      password
    }, { withCredentials: true })
      .then(res => {
        console.log(res)
        nav('/dash')
      })
      .catch(err=>{
        console.log(err.response.data.msg)
        const errorResponse = err.response.data.msg; // Get the errors from err.response.data
        setErrorsLog(errorResponse);
    }) 
  }
  const signup = e => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/register', {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    }, { withCredentials: true })
      .then(res => {
        console.log(res.ok)
        console.log(res)
        if (res.statusText) {
          nav('/dash')
        }

      })
      .catch(err=>{
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
            errorArr.push(errorResponse[key].message)
        }
        // Set Errors
        setErrorsSign(errorArr);
    }) 
  }





  return (
    <div >
      <main className="text-container">
        <svg className="text-stroke" viewBox="0 0 600 100" width="100%" height="100%">
          <text className="text" x="20" y="75">CoinTracker</text>
        </svg>
      </main>
      <div className='d-flex justify-content-center mt-5 gap-5 '  >
        <form onSubmit={login} >
          <h3>Login</h3>
          <p>{errorsLog}</p>
          <div className='mb-3'>
            <label htmlFor="email" className='form-label'>Email</label>
            <input type="text" className='form-control' onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='mb-3'>
            <label htmlFor="pass" className='form-label'>Password</label>
            <input type="password" className='form-control' onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className='btn btn-outline-success'>Login</button>
        </form>
        <form onSubmit={signup}>
          <h3>Sign-up</h3>
          {errorsSign.map((err, index) => <p key={index}>{err}</p>)}
          <div className="mb-3">
            <label htmlFor="firstName" className='form-label'>First Name:</label>
            <input type="text" className='form-control' onChange={e => setFirstName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className='form-label'>Last Name:</label>
            <input type="text" className='form-control' onChange={e => setLastName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className='form-label'>Email</label>
            <input type="text" className='form-control' onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="pass" className='form-label'>Password:</label>
            <input type="password" className='form-control' onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPass" className='form-label'>Confirm Password:</label>
            <input type="password" className='form-control' onChange={e => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit" className='btn btn-outline-success'>Sign-up</button>
        </form>
      </div>
      <p style={{textAlign: "center", marginTop: "50px"}}>Logo Animation Credits: <a href="https://codepen.io/Taluska/pen/yLRZRoY">CodePen</a> </p>
    </div>
  )

}

export default Landing