"use client";

import React, { useEffect, useState } from "react";
import { mockinterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { db } from "@/utils/db";
import QuestionsSec from "./_components/QuestionsSec";
import RecordanswerSec from "./_components/RecordanswerSec";

function StartInterview({ params }) {
  const [interviewdata, setInterviewdata] = useState(null);
  const [mockinterviewquestion, setmockinterviewquestion] = useState([]);
  const [activequestionindex, setactivequestionindex] = useState(0);

  // Fetch interview details when the component mounts
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
        console.log("Mock Interview Questions:", jsonMockresp);
        setmockinterviewquestion(jsonMockresp);
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
        />
      </div>
    </div>
  );
}

export default StartInterview;