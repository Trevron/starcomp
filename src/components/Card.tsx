import React from 'react'
import {Link} from 'react-router-dom'

type CardProps = {
    name: string,
    description: string,
    characteristics?: string[]
}

export default function ({name, description, characteristics}: CardProps) {

  return (
    <div className="w-3/4 my-5 mx-auto bg-slate-700 shadow-xl rounded-lg text-gray-50">
        <div className="flex flex-wrap flex-col">
            <div className="p-2">
                <h2 className="text-5xl">{name}</h2>
                    <ul className="flex justify-around flex-wrap list-disc ml-4 text-gray-300">
                        <li>Property 1</li>
                        <li>Property 2</li>
                        <li>Property 3</li>
                        <li>Property 4</li>
                        
                    </ul>

                <p className="text-2xl">
                    {description}
                </p>
                <div className="flex justify-end text-amber-400 font-bold">
                    <Link to={`/planet/${name}`}>
                        See more details
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}