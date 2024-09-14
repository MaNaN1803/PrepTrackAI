import React from 'react'
import Addnewinterview from './_components/Addnewinterview'

function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl'>
      Dashboard
      </h2>
      <h2 className='text-gray-500'>
      Kickstart Your Success with PrepTrackAI -- Your AI-Powered Interview Coach! 
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <Addnewinterview/>
      </div>
    </div>
  )
}

export default Dashboard