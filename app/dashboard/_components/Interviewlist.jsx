"use client";

import { db } from '@/utils/db';
import { mockinterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import Interviewcard from './Interviewcard';


function Interviewlist() {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    const result = await db
      .select()
      .from(mockinterview)
      .where(eq(mockinterview.createdby, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(mockinterview.id));

    setInterviewList(result);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="font-bold text-2xl text-gray-900 mb-6">Previous Mock Interviews :</h2>
      <div className="grid grid-cols-1 gap-6">
        {InterviewList &&
          InterviewList.map((interview, index) => (
            <Interviewcard interview={interview} key={index} />
          ))}
      </div>
    </div>
  );
}

export default Interviewlist;
