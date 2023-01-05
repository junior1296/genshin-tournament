import { useState, useEffect, useRef } from 'react'

export default function RandomCategory({random, count, setCount, addToHistory}) {

  useEffect(() => {
    let clock = null

    if(count>=0) {
      clock = setInterval(() => {
        setCount(prevCount => prevCount - 1)
      }, 1000);
    }

    if (count < 0) {
      addToHistory()
    }
    
    return () => { 
      clearInterval(clock)
    }

  }, [count, setCount])

  return (
    <div className="Card Center">
        {
          count >= 0 ?
          <p className="Text-display">{count}</p> :
          <p className="Text-display">{random}</p>
        }
    </div>
  )
}