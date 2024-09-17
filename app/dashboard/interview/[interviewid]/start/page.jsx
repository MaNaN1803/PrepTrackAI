"use client";

import React, { useEffect, useState } from "react";
import { mockinterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { db } from "@/utils/db";
import QuestionsSec from "./_components/QuestionsSec";
import RecordanswerSec from "./_components/RecordanswerSec";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewdata, setInterviewdata] = useState(null);
  const [mockinterviewquestion, setmockinterviewquestion] = useState([]);
  const [activequestionindex, setactivequestionindex] = useState(0);

  useEffect(() => {
    if (params && params.interviewid) {
      getInterviewDetails();
    }
  }, [params]);

  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(mockinterview)
        .where(eq(mockinterview.mockid, params.interviewid));
  
      if (result && result[0]) {
        const jsonMockresp = JSON.parse(result[0].jsonMockresp);
  
        // Transform the fetched data to ensure lowercase 'question' and 'answer'
        const transformedMockResp = jsonMockresp.map((item) => ({
          question: item.Question,  // Map 'Question' to 'question'
          answer: item.Answer,      // Map 'Answer' to 'answer'
          ...item,                  // Spread any other fields (if necessary)
        }));
  
        console.log("Transformed Mock Interview Questions:", transformedMockResp);
  
        setmockinterviewquestion(transformedMockResp);
        setInterviewdata(result[0]);
      } else {
        console.error("No interview data found.");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      {/* Grid layout for side-by-side display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions on the left */}
        <QuestionsSec
          mockinterviewquestion={mockinterviewquestion}
          activequestionindex={activequestionindex}
          setactivequestionindex={setactivequestionindex}
        />
        
        {/* Recording Section on the right */}
        <RecordanswerSec
         mockinterviewquestion={mockinterviewquestion}
         activequestionindex={activequestionindex}
         interviewdata={interviewdata}
        />
      </div>
      <div className="justify-end gap-5 flex mt-2">
        {activequestionindex>0&&<Button onClick={()=>setactivequestionindex(activequestionindex-1)}>Prev Question</Button>}
        {activequestionindex!=mockinterviewquestion?.length-1&&<Button onClick={()=>setactivequestionindex(activequestionindex+1)}>Next Question</Button>}
        {activequestionindex==mockinterviewquestion?.length-1&&
        <Link href={'/dashboard/interview/'+interviewdata?.mockid+"/feedback"}>
        <Button>End Interview</Button>
        </Link>
        }
      </div>
    </div>
  );
}

export default StartInterview;