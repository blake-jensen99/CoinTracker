import { useEffect, useState } from "react"
import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import Nav from "./Nav"

const EH = () => {
    const [adCoins, setADCoins] = useState([])
    const TOKEN = process.env.REACT_APP_KEY


    useEffect(() => {
        axios.get('https://api.coinlore.net/api/tickers/')
            .then(res => {
                console.log(res.data.data)
                setADCoins(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div>
            <Nav />
            <div className=' text-center d-flex gap-5 justify-content-center'>
                <Link to={'/ad'} style={{textDecoration: "none"}}><h3>A-D</h3></Link>
                <Link to={'/eh'}><h3>E-H</h3></Link>
                <Link to={'/il'} style={{textDecoration: "none"}}><h3>I-L</h3></Link>
                <Link to={'/mp'} style={{textDecoration: "none"}}><h3>M-P</h3></Link>
                <Link to={'/qt'} style={{textDecoration: "none"}}><h3>Q-T</h3></Link>
                <Link to={'/uz'} style={{textDecoration: "none"}}><h3>U-Z</h3></Link>
            </div>
            <Link to={'/dash'} style={{textDecoration: "none"}}><h3 className='text-center my-5'>Dashboard</h3></Link>
            <table className='table table-dark table-striped'>
                <thead>
                    <th className='ps-5'>Name</th>
                    <th className='ps-5'>Symbol</th>
                    <th className='ps-5'>USD Price</th>
                </thead>
                <tbody>
                    {
                        adCoins.sort((a, b) => a.name.localeCompare(b.name)).filter(coin => coin.name[0] === "E" || coin.name[0] === "F" || coin.name[0] === "G" || coin.name[0] === "H").map((coin, i) => {
                            return (
                                <tr>
                                    <td><h3 style={{ backgroundColor: 'transparent' }} className='ps-5'>{coin.name}</h3></td>
                                    <td><h3 style={{ backgroundColor: 'transparent' }} className='ps-5'>{coin.symbol}</h3></td>
                                    <td><h3 style={{ backgroundColor: 'transparent' }} className='ps-5'>${coin.price_usd}</h3></td>
                                    <td><button className="btn btn-outline-primary"><Link to={`/${coin.id}`} style={{textDecoration: "none"}}><h3 style={{ backgroundColor: 'transparent' }}>View</h3></Link></button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default EH