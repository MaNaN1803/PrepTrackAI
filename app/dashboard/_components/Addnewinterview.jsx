"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'

function Addnewinterview() {
    const [openDailog, setOpenDailog] = useState(false);
    const [jobPosition, setJobPosition]=useState();
    const [jobDesc, setJobDesc]=useState();
    const [jobExperience, setJobExperience]=useState();
    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);
    }

  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={()=>setOpenDailog(true)}
        >
            <h2 className='font-semibold text-lg'>+ Add New</h2>
        </div>
        <Dialog open={openDailog}>
        <DialogContent className='max-w-2xl'>
            <DialogHeader>
            <DialogTitle className='text-2xl'>Tell use more about your interview</DialogTitle>
            <DialogDescription>
                <form onSubmit={onSubmit}>
                <div>
                    <h2>Add details about your job position/role , Job description and years of experience </h2>
                
                    <div className='mt-7 my-3'>
                        <label> Job Role/Job Position</label>
                        <Input  placeholder="Ex. SDE 1,2.. , Full Stack Developer" required 
                        onChange={(event)=>setJobPosition(event.target.value)}
                        />
                    </div>
                    <div className=' my-3'>
                        <label> Job Description/Tech Stack (In Short)</label>
                        <Textarea  placeholder="Ex. NextJs , NodeJs , DBMS , Etc... " required 
                        onChange={(event)=>setJobDesc(event.target.value)}
                        />
                    </div>
                    <div className='my-3'>
                        <label> Years Of Experience</label>
                        <Input  placeholder="Ex. Mention Years like  1 ,2 ,3..." type="number" min="0" max="80" required 
                        onChange={(event)=>setJobExperience(event.target.value)}
                        />
                    </div>
                
                </div>
                <div className='flex gap-5 justify-end '>
                    <button type='button' variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</button>
                    <button type='submit' >Start Interview !!</button>
                </div>
                </form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default Addnewinterview