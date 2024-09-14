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
import { chatSession } from '@/utils/GeminiAIModal'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { mockinterview } from '@/utils/schema'
import { v4 as uuiidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs';
import moment from 'moment'
import { useRouter } from 'next/router'


function Addnewinterview() {
    const [openDailog, setOpenDailog] = useState(false);
    const [jobPosition, setJobPosition]=useState();
    const [jobDesc, setJobDesc]=useState();
    const [jobExperience, setJobExperience]=useState();
    const [loading,setloading]=useState(false);
    const [jsonresponse,setjsonresponse]=useState([]);
    const {user} = useUser();
    const router= useRouter();
    
    const onSubmit= async (e)=>{
        setloading(true)

        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt="Job Position: "+jobPosition+", Job Description:"+jobDesc+", Years of Experience: "+jobExperience+", Depends on this information please give me "+process.env.NEXT_PUBLIC_NUMBER_OF_QUESTION+" Interview question with Answered in Json Format, Give Question and Answered as field in JSON";

        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(MockJsonResp));

        setjsonresponse(MockJsonResp);
        if(MockJsonResp){
        const resp=await db.insert(mockinterview).values({
            mockid:uuiidv4(),
            jsonMockresp:MockJsonResp,
            jobPosition:jobPosition,
            jobDesc:jobDesc,
            jobExperience:jobExperience,
            createdby:user?.primaryEmailAddress?.emailAddress,
            createdat:moment().format('DD-MM-yyyy')
        }).returning({
            mockid:mockinterview.mockid
        })

        console.log("Inserted ID: ",resp)
    
        if(resp){
            setOpenDailog(false);
            router.push('/dashboard/interview/'+resp[0].mockid)
        }
    
    
    }
    else{
        console.log("Error");
    }
        setloading(false)
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
                    <Button type='button' variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</Button>
                    <Button type='submit' disabled={loading}>
                    {loading?
                        <>
                        <LoaderCircle/>'Generating YOUR AI Powered Interview'
                        </>:'Start Interview !!'
                    }
                    </Button>
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