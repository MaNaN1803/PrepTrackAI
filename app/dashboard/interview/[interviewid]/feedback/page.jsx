"use client";

import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockidref, params.interviewid)).orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
  };

  const calculateOverallRating = () => {
    if (feedbackList.length === 0) return 0;
    const totalRating = feedbackList.reduce((acc, item) => acc + (parseInt(item.rating) || 0), 0);
    return (totalRating / feedbackList.length).toFixed(1);
  };

  const overallRating = calculateOverallRating();

  return (
    <div className='p-10 max-w-4xl mx-auto'>
      <h1 className='text-4xl font-extrabold text-green-700 mb-4'>Congratulations!</h1>
      <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Interview Feedback & Insights</h2>
      <p className='text-lg text-gray-600 mb-4'>
        Your overall interview rating: <strong className={`text-${overallRating < 5 ? 'red' : 'green'}-600`}>{overallRating}/10</strong>
      </p>
      <p className='text-sm text-gray-500 mb-6'>
        Below is the feedback on each interview question, including the correct answers, your responses, and suggestions for improvement.
      </p>
      {feedbackList && feedbackList.map((item, index) => (
        <Collapsible key={index} className='mb-6'>
          <CollapsibleTrigger className='p-4 bg-gray-100 rounded-lg text-gray-700 flex justify-between items-center'>
            <span className='text-base font-medium'>{item.question}</span>
            <ChevronsUpDown className='h-5 w-5 text-gray-500' />
          </CollapsibleTrigger>
          <CollapsibleContent className='p-4 bg-white border border-gray-200 rounded-lg shadow-md'>
            <div className='flex flex-col gap-4'>
              <div className='p-4 border rounded-lg bg-red-50 text-red-800'>
                <strong className='text-base'>Rating:</strong> {item.rating}
              </div>
              <div className='p-4 border rounded-lg bg-gray-50 text-gray-800'>
                <strong className='text-base'>Your Answer:</strong> {item.userAnswer}
              </div>
              <div className='p-4 border rounded-lg bg-green-50 text-green-800'>
                <strong className='text-base'>Correct Answer:</strong> {item.correctans}
              </div>
              <div className='p-4 border rounded-lg bg-blue-50 text-blue-800'>
                <strong className='text-base'>Feedback:</strong> {item.feedback}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      <Button className='mt-6 bg-green-600 text-white hover:bg-green-700' onClick={() => router.replace('/dashboard')}>
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
