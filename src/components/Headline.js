import React from 'react'

export default function Headline({ text, children }) {
  return (
    <div className='p-5 bg-gray-800 text-white flex flex-row items-center font-black'>
        <h1 className='text-4xl text-left inline pr-5'>{ text }</h1>
        { children }
    </div>
  )
}