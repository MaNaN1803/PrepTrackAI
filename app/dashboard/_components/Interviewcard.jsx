import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

function Interviewcard({ interview }) {
  const router = useRouter();

  const onStartInterview = () => {
    router.push('dashboard/interview/' + interview.mockid);
  };

  const onFeedbackPress = () => {
    router.push('dashboard/interview/' + interview.mockid + '/feedback');
  };

  return (
    <div className="bg-white border border-blue-300 shadow-lg rounded-lg p-6">
      <h2 className="font-bold text-xl text-gray-900">{interview?.jobPosition}</h2>
      <h3 className="text-md text-gray-700 mt-1">Years of Experience : {interview?.jobExperience}</h3>
      <h4 className="text-sm text-gray-500 mt-2">
        Created At: {interview?.createdat}
      </h4>
      <div className="flex justify-between gap-4 mt-4">
        <Button
          size="sm"
          variant="outline"
          className="w-full text-gray-700 border-gray-300 hover:bg-gray-100 transition-all"
          onClick={onFeedbackPress}
        >
          Interview Feedback/Insights
        </Button>
        <Button
          size="sm"
          className="w-full bg-gray-800 text-white hover:bg-gray-700 transition-all"
          onClick={onStartInterview}
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default Interviewcard;
