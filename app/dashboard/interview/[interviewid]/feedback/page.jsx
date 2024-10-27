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
import jsPDF from 'jspdf';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockidref, params.interviewid)).orderBy(UserAnswer.id);
    setFeedbackList(result);
  };

  const calculateOverallRating = () => {
    if (feedbackList.length === 0) return 0;
    const totalRating = feedbackList.reduce((acc, item) => acc + (parseInt(item.rating) || 0), 0);
    return (totalRating / feedbackList.length).toFixed(1);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Interview Feedback & Insights", doc.internal.pageSize.width / 2, yPos, { align: "center" });
    yPos += 15;

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    doc.text(`Overall Interview Rating:`, 15, yPos);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 102, 204);
    doc.text(`${calculateOverallRating()}/10`, 85, yPos);
    yPos += 20;

    feedbackList.forEach((item, index) => {
      if (index > 0) {
        doc.addPage();
        yPos = 20;
      }

      // Header for Each Question Section
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text(`Question ${index + 1}:`, 15, yPos);
      yPos += 8;

      // Question Content with Justification
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(doc.splitTextToSize(item.question, 180), 20, yPos);
      yPos += 14;

      // Rating Section
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text("Rating:", 15, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(`${item.rating}`, 45, yPos);
      yPos += 10;

      // User Answer with Justification
      doc.setFont("helvetica", "bold");
      doc.text("Your Answer:", 15, yPos);
      yPos += 6;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text(doc.splitTextToSize(item.userAnswer, 180), 20, yPos);
      yPos += 14;

      // Correct Answer Section
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text("Correct Answer:", 15, yPos);
      yPos += 6;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text(doc.splitTextToSize(item.correctans, 180), 20, yPos);
      yPos += 14;

      // Feedback Section
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text("Feedback:", 15, yPos);
      yPos += 6;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text(doc.splitTextToSize(item.feedback, 180), 20, yPos);
      yPos += 20;
    });

    doc.save("Interview_Feedback_Formatted.pdf");
  };

  const generatePDFForQuestion = (index) => {
    const doc = new jsPDF();
    const item = feedbackList[index];
    let yPos = 20;

    // Title for each PDF
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Interview Feedback", doc.internal.pageSize.width / 2, yPos, { align: "center" });
    yPos += 15;

    // Overall Rating
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    doc.text(`Overall Interview Rating:`, 15, yPos);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 102, 204);
    doc.text(`${calculateOverallRating()}/10`, 85, yPos);
    yPos += 20;

    // Question details
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text(`Question ${index + 1}:`, 15, yPos);
    yPos += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(doc.splitTextToSize(item.question, 180), 20, yPos);
    yPos += 14;

    // Rating Section
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text("Rating:", 15, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(`${item.rating}`, 45, yPos);
    yPos += 10;

    // User Answer
    doc.setFont("helvetica", "bold");
    doc.text("Your Answer:", 15, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(doc.splitTextToSize(item.userAnswer, 180), 20, yPos);
    yPos += 14;

    // Correct Answer Section
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text("Correct Answer:", 15, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(doc.splitTextToSize(item.correctans, 180), 20, yPos);
    yPos += 14;

    // Feedback Section
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text("Feedback:", 15, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(doc.splitTextToSize(item.feedback, 180), 20, yPos);
    yPos += 20;

    doc.save(`Interview_Feedback_Question_${index + 1}.pdf`);
  };

  const overallRating = calculateOverallRating();

  return (
    <div className='p-10 max-w-4xl mx-auto'>
      {feedbackList?.length === 0 ? (
        <div>
          <h2 className='text-4xl font-extrabold text-blue-500 mb-4'>Welcome !!</h2>
          <h3 className='text-xl text-gray-500'>
            Start with your first interview to view the Insights/Feedback...
          </h3>
        </div>
      ) : (
        <>
          <h1 className='text-4xl font-extrabold text-green-700 mb-4'>Congratulations!</h1>
          <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Interview Feedback & Insights</h2>
          <p className='text-lg text-gray-600 mb-4'>
            Your overall interview rating: <strong className={`text-${overallRating < 5 ? 'red' : 'green'}-600`}>{overallRating}/10</strong>
          </p>
          <p className='text-sm text-gray-500 mb-6'>
            Below is the feedback on each interview question, including the correct answers, your responses, and suggestions for improvement.
          </p>
          <Button className='mt-4 mb-6 bg-blue-600 text-white hover:bg-blue-700' onClick={generatePDF}>
            Download Full PDF
          </Button>
          {feedbackList.map((item, index) => (
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
                  <Button
                    className='mt-4 bg-blue-600 text-white hover:bg-blue-700'
                    onClick={() => generatePDFForQuestion(index)}
                  >
                    Download PDF for this Question
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Button className='mt-6 bg-green-600 text-white hover:bg-green-700' onClick={() => router.replace('/dashboard')}>
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
