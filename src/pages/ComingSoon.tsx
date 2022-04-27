import React from 'react'
import deathstar from '../img/deathstarish.png'

type Props = {}

/**
 *  Landing page while in development
 * 
 */

export default function ComingSoon({}: Props) {
  return (
    <div className="text-gray-50">
        <main className="flex flex-col items-center mt-20">
            <img className="w-1/4 animate-bounce" src={deathstar}/>
            <h2 className="animate-pulse text-3xl">Coming soon!</h2>
        </main>
    </div>
  )
}