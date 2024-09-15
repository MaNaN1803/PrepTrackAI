"use client";
import { db } from '@/utils/db';
import React, { useEffect, useState } from 'react';
import { mockinterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import Link from 'next/link';

function Interview() {
    const [interviewdata, setInterviewdata] = useState(null);
    const [webcamenabled, setWebcamenabled] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const params = useParams();
    const interviewid = params.interviewid; 

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true);
        }
    }, []);

    useEffect(() => {
        if (interviewid && isClient) {
            console.log("Interview ID:", interviewid);
            getInterviewDetails(interviewid);
        }
    }, [interviewid, isClient]);

    const getInterviewDetails = async (id) => {
        const result = await db.select().from(mockinterview).where(eq(mockinterview.mockid, id));
        console.log("DB result: ", result);
        setInterviewdata(result[0]);
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className="my-12 px-6 max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8">
            {/* Heading and Tagline */}
            <h2 className="text-4xl font-extrabold text-gray-800 leading-tight tracking-wide mb-6">
                Elevate Your Interview Mastery with AI Precision!
            </h2>
            <blockquote className="text-lg font-semibold italic text-gray-600 text-right mb-10">
                "Start Strong, Finish Confident – AI Interview Prep!"
                <br />
                <span className="text-base font-light text-gray-500">– Manan Telrandhe</span>
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Webcam Section */}
                <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                    {webcamenabled ? (
                        <Webcam
                            onUserMedia={() => setWebcamenabled(true)}
                            onUserMediaError={() => setWebcamenabled(false)}
                            mirrored={true}
                            className="rounded-lg shadow-md"
                            style={{
                                height: '100%',
                                width: '100%',
                                maxHeight: '300px',
                                maxWidth: '300px'
                            }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className="h-60 w-60 text-gray-400 my-6 bg-gray-100 p-10 rounded-lg border" />
                            <Button className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-2" variant="ghost" onClick={() => setWebcamenabled(true)}>
                                Enable Web Cam and Microphone
                            </Button>
                        </>
                    )}
                </div>

                {/* Interview Details Section */}
                <div className="flex flex-col space-y-6 order-last md:order-none">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Role/Job Position:</h3>
                        <p className="text-md text-gray-600">{interviewdata ? interviewdata.jobPosition : "Loading..."}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Description/Tech Stack:</h3>
                        <p className="text-md text-gray-600">{interviewdata ? interviewdata.jobDesc : "Loading..."}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Years Of Experience:</h3>
                        <p className="text-md text-gray-600">{interviewdata ? interviewdata.jobExperience : "Loading..."}</p>
                    </div>
                    <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-yellow-800 flex items-center gap-2">
                            <Lightbulb className="text-yellow-700" /> Interview Information:
                        </h3>
                        <p className="text-md font-semibold text-yellow-800">
                            {process.env.NEXT_PUBLIC_Info}
                        </p>
                    </div>
                </div>

                {/* Start Button for Small Screens */}
                <div className="flex justify-center mt-8">
                    <Link href={'/dashboard/interview/'+params.interviewid+'/start'}>
                    <Button className="text-white bg-green-600 hover:bg-green-700 rounded-lg px-6 py-3">
        Start Your Interview!
    </Button>
                    
                    </Link>
    
</div>
            </div>

            
        </div>
    );
}

export default Interview;