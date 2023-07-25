import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const One = () => {
  const { id } = useParams()
  const [coin, setCoin] = useState([])
  const [color24, setColor24] = useState('')
  const [color1, setColor1] = useState('')
  const [color7, setColor7] = useState('')
  const [user, setUser] = useState({})
  const [uid, setUid] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [favs, setFavs] = useState([])
  const destruct = []
  const [btnDis, setBtnDis] = useState('')
  const nav = useNavigate()
  const [price, setPrice] = useState(0)

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



  // console.log(user)
  useEffect(() => {
    axios.get('https://api.coinlore.net/api/ticker/?id=' + id)
      .then(res => {
        // console.log(res.data)
        setCoin(res.data[0])
        if (res.data[0].percent_change_24h > 0) {
          setColor24('green')
        }
        else {
          setColor24('red')
        }
        if (res.data[0].percent_change_1h > 0) {
          setColor1('green')
        }
        else {
          setColor1('red')
        }
        if (res.data[0].percent_change_7d > 0) {
          setColor7('green')
        }
        else {
          setColor7('red')
        }
      })
      .catch(err => console.log(err))
  }, [])

  function favorite(e) {
    e.preventDefault()
    setBtnDis('none')
    axios.patch('http://localhost:8000/api/user/' + uid, {
      id
    }, { withCredentials: true })
      .then(res => {
        nav('/dash')

        // console.log(res)
      })
      .catch(err => console.log(err))
  }
  function unfavorite(e) {
    e.preventDefault()
    axios.patch('http://localhost:8000/api/user/remove/' + uid, {
      id
    }, { withCredentials: true })
      .then(res => {
        // console.log(res)
        nav('/dash')
      })
      .catch(err => console.log(err))
  }

  const multiply = (e) => {
    setPrice(e.target.value * coin.price_usd)
  }



  return (
    <div >
      <Nav />
      <div>
        <div className=' text-center d-flex gap-5 justify-content-center'>
          <Link to={'/ad'} style={{ textDecoration: "none" }}><h3>A-D</h3></Link>
          <Link to={'/eh'} style={{ textDecoration: "none" }}><h3>E-H</h3></Link>
          <Link to={'/il'} style={{ textDecoration: "none" }}><h3>I-L</h3></Link>
          <Link to={'/mp'} style={{ textDecoration: "none" }}><h3>M-P</h3></Link>
          <Link to={'/qt'} style={{ textDecoration: "none" }}><h3>Q-T</h3></Link>
          <Link to={'/uz'} style={{ textDecoration: "none" }}><h3>U-Z</h3></Link>
        </div>
        <Link to={'/dash'} style={{ textDecoration: "none" }}><h3 className='text-center my-5'>Dashboard</h3></Link>
        <div style={{ marginLeft: '200px' }} className='d-flex align-items-center gap-5 mt-5'>
          <div className='d-flex align-items-start gap-5'>
            <div className='mt-5'>
              <h1>{coin.name}</h1>
              <div className='m-5' >
                <h2>Symbol: {coin.symbol}</h2>
                <br />
                <h4>USD: ${coin.price_usd}</h4>
                <br />
                <h4>Market Cap: ${coin.market_cap_usd}</h4>
                <br />
                <h4>Percent Change in the last 24 hours: <span style={{ color: color24 }}>{coin.percent_change_24h}%</span></h4>
                <br />
                <h4>Percent Change in the last hour: <span style={{ color: color1 }}>{coin.percent_change_1h}%</span></h4>
                <br />
                <h4>Percent Change in the last week: <span style={{ color: color7 }}>{coin.percent_change_7d}%</span></h4>
                <br />
                <h4><Link to={`https://www.coinlore.com/coin/${coin.nameid}`}>More Information</Link></h4>
              </div>
            </div>
            {destruct.includes(coin.id) ? <button onClick={unfavorite} className='btn btn-outline-danger mt-5'>Remove</button> : <button onClick={favorite} style={{ display: btnDis }} className='btn btn-outline-success mt-5'>Favorite</button>}
          </div>
          <div className='ms-5 d-flex flex-column gap-5 align-items-start'>
            <div>
              <label htmlFor="">Number of Coins:</label>
              <br />
              <input type="number" onChange={multiply} step={0.0000000001} />
            </div>
            <div>
              <p>Total: ${price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default One