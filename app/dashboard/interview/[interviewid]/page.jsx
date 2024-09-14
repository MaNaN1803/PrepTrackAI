"use client"
import { db } from '@/utils/db'
import React, { useEffect, useState } from 'react'
import { mockinterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'


function Interview(params) {
    const [interviewdata,setinterviewdata]=useState();
    useEffect(()=>{
        console.log(params.interviewid)
        getinterviewdetails();
    },[])

    const getinterviewdetails=async()=>{
        const result = await db.select().from(mockinterview).where(eq(mockinterview.mockid,params.interviewid))

        setinterviewdata(result[0]);
    }

  return (
    <div className='my-10'>
        <h2 className='text-3xl font-bold text-gray-800 leading-tight tracking-wide'>
        "Elevate Your Interview Mastery with the Precision of AI!"
            </h2>
            <blockquote className='mt-5 text-xl text-right font-semibold italic text-gray-700'>
                "Start Strong, Finish Confident – AI Interview Prep!"
                <br />
                <span className='mt-2 block text-right text-base italic font-light text-gray-600'>
                    – Manan Telrandhe
                </span>
            </blockquote>
    </div>
  )
}

export default Interview