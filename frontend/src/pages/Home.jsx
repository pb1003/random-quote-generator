import { useState,useEffect } from "react"
import React from 'react'

function Home() {
  const [randomQuote, setRandomQuote] = useState(null)

    useEffect(() => {
    (async () => {
      console.log("inside effect")
      const res = await fetch('http://13.201.129.179/getQuote')
      const data = await res.json()
      setRandomQuote(data.quote)
      console.log(data.quote)
    })()

  }, [])

  return (
    <div>


 <h1 className='text-3xl font-bold underline'> Quote of the day </h1> 
      <div>{randomQuote}</div> 
    </div>
  )
}

export default Home