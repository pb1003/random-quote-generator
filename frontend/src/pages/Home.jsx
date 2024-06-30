import { useState,useEffect } from "react"
import React from 'react'

function Home() {
  const [randomQuote, setRandomQuote] = useState(null)

    useEffect(() => {
    (async () => {
      const res = await fetch('http://13.201.129.179/getQuote')
      const data = await res.json()
      setRandomQuote(data.quote)
    })()

  }, [])

  return (
    <div className="h-screen bg-slate-900">
        <div className="h-1/6 text-center pt-5">
        <h1 className='text-3xl font-bold h-11 text-white '> Daily dose of dad-astic humour </h1>
        </div>
        <div className="h-5/6 font-bold flex pb-10 justify-center items-center">
        <div className="pb-72  text-white antialiased">{randomQuote}</div> 
        </div>

    </div>
  )
}

export default Home