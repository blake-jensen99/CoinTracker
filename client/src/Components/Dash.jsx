import React, { useState } from 'react'
import Nav from './Nav'
import { useEffect } from 'react';
import './Dash.css'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Dash = () => {
const [coins, setCoins] = useState([])
const [user, setUser] = useState({})
const [uid, setUid] = useState(null)
const [loaded, setLoaded] = useState(false)
const [favs, setFavs] = useState([])
const destruct = []

useEffect(() => {
  axios.get('http://localhost:8000/api/getUser', { withCredentials: true })
    .then(res => {
      // console.log(res.data)
      setUser(res.data)
      setUid(res.data._id)
      setFavs(res.data.favs)
      setLoaded(true)
    })
    .catch(err => console.log(err))
}, [])



if (loaded) {
  for (let i = 0; i < favs.length; i++) {
    destruct.push(favs[i].id)
  }
  // console.log(destruct)
}

useEffect(() => {
  axios.get('https://api.coinlore.net/api/tickers/')
    .then(res => {
      // console.log(res.data.data)
      setCoins(res.data.data)
    })
    .catch(err => console.log(err))
},[])



console.log(coins)



  return (
    <div style={{backgroundColor:'transparent'}} >
        <Nav/>
        <div className='d-flex main m-5' >
            <div className='perf flex1'>
                <h2 className='text-center mb-5'>In The Green (24h)</h2>
                <div className='border p-5'>
                  {
                    coins.filter(coin => coin.percent_change_24h > 0).map((coin, i) => {
                      return (
                        <div>
                          <div className='d-flex align-items-center gap-5 my-5'>
                            <Link to={`/${coin.id}`} style={{textDecoration:'none'}}><h1>{coin.name}</h1></Link>
                          </div>
                          <hr />
                        </div>
                      )
                    })
                  }
                </div>
            </div>
            <div className='mine flex1'>
                <h2 className='text-center mb-5'>My Coins</h2>
                {destruct.length > 0? <div className='border p-5'>
                {
                    coins.filter(coin => destruct.includes(coin.id) > 0).map((coin, i) => {
                      return (
                        <div>
                          <div className='d-flex align-items-center gap-5 my-5'>
                            <Link to={`/${coin.id}`} style={{textDecoration:'none'}}><h1>{coin.name}</h1></Link>
                          </div>
                          <hr />
                        </div>
                      )
                    })
                  }
                </div> : <h4>No Coins Saved</h4> }
                
            </div>
            <div>
              <h2 className='text-center mb-5'>All Coins</h2>
              <div className='border p-5 text-center'>
                <Link to={'/ad'}><h3>A-D</h3></Link>
                <br />
                <Link to={'/eh'}><h3>E-H</h3></Link>
                <br />
                <Link to={'/il'}><h3>I-L</h3></Link>
                <br />
                <Link to={'/mp'}><h3>M-P</h3></Link>
                <br />
                <Link to={'/qt'}><h3>Q-T</h3></Link>
                <br />
                <Link to={'/uz'}><h3>U-Z</h3></Link>
              </div>
            </div>

        </div>

    </div>
  )
}

export default Dash