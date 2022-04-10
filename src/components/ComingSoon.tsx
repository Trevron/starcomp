import React from 'react'
import deathstar from '../deathstarish.png'

type Props = {}

export default function ComingSoon({}: Props) {
  return (
    <div className="text-gray-50">
        <header className="w-screen bg-gray-900 flex:center">
            <h1 className="font-['Impact'] text-5xl text-amber-400 p-2">
                StarComp
            </h1>
        </header>
        <body className="flex flex-col items-center mt-20">
            <img className="w-1/4 animate-bounce" src={deathstar}/>
            <h2 className="animate-pulse text-3xl">Coming soon!</h2>
        </body>
    </div>
  )
}