"use client";
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { mockinterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router

function Addnewinterview() {
    const [openDailog, setOpenDailog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonresponse, setJsonresponse] = useState([]);
    const { user } = useUser();
    const router = useRouter(); // Using useRouter from next/navigation

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depends on this information please give me ${process.env.NEXT_PUBLIC_NUMBER_OF_QUESTION} Interview question with Answered in Json Format, Give Question and Answered as field in JSON`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const MockJsonResp = (await result.response.text()).replace("```json", "").replace("```", "");
            console.log(JSON.parse(MockJsonResp));

            setJsonresponse(MockJsonResp);

            if (MockJsonResp) {
                const resp = await db.insert(mockinterview).values({
                    mockid: uuidv4(),
                    jsonMockresp: MockJsonResp,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    createdby: user?.primaryEmailAddress?.emailAddress,
                    createdat: moment().format('DD-MM-yyyy')
                }).returning({
                    mockid: mockinterview.mockid
                });

                console.log("Inserted ID: ", resp);

                if (resp) {
                    setOpenDailog(false);
                    router.push(`/dashboard/interview/${resp[0].mockid}`);
                }
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("Error during submission:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div
                className='p-6 border rounded-lg bg-primary hover:scale-105 hover:shadow-lg cursor-pointer transition-all'
                onClick={() => setOpenDailog(true)}
            >
                <h2 className='font-semibold text-lg text-white flex items-center gap-2 dark:text-black dark:bg-white'>
                    + Add New Interview   <span role="img" aria-label="add">  ➕</span>
                </h2>
            </div>
            <Dialog open={openDailog}>
                <DialogContent className='max-w-2xl bg-black bg-opacity-70 dark:bg-opacity-90 rounded-lg shadow-lg p-8'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl font-semibold text-white dark:text-yellow-400'>
                            Tell us more about your interview
                        </DialogTitle>
                        <DialogDescription className='mt-4 text-gray-300'>
                            <form onSubmit={onSubmit}>
                                <div className='space-y-6'>
                                    <div className='flex flex-col'>
                                        <label className='text-lg font-medium text-gray-200'>
                                            Job Role/Job Position
                                        </label>
                                        <Input 
                                            placeholder="Ex. SDE 1,2.. , Full Stack Developer" 
                                            required
                                            className='mt-2 bg-gray-800 text-gray-200'
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-lg font-medium text-gray-200'>
                                            Job Description/Tech Stack (In Short)
                                        </label>
                                        <Textarea 
                                            placeholder="Ex. NextJs , NodeJs , DBMS , Etc..." 
                                            required
                                            className='mt-2 bg-gray-800 text-gray-200'
                                            onChange={(event) => setJobDesc(event.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-lg font-medium text-gray-200'>
                                            Years Of Experience
                                        </label>
                                        <Input 
                                            placeholder="Ex. Mention Years like 1 ,2 ,3..." 
                                            type="number" 
                                            min="0" 
                                            max="80" 
                                            required
                                            className='mt-2 bg-gray-800 text-gray-200'
                                            onChange={(event) => setJobExperience(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-4 justify-end mt-6'>
                                    <Button 
                                        type='button' 
                                        variant="outline" 
                                        onClick={() => setOpenDailog(false)}
                                        className=' text-gray-200 border-gray-500'
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type='submit' 
                                        disabled={loading}
                                        className='bg-blue-500 text-white dark:bg-yellow-400 dark:text-black border-gray-500'
                                    >
                                        {loading ? (
                                            <>
                                                <LoaderCircle className='animate-spin mr-2' /> Generating YOUR AI Powered Interview
                                            </>
                                        ) : 'Start Interview !!'}
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

export default Addnewinterview;
