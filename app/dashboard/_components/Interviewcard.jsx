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
    <div className="bg-white border border-blue-300 shadow-lg rounded-lg p-4 sm:p-6 flex flex-col justify-between h-full hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h2 className="font-bold text-lg sm:text-xl text-gray-900">
          {interview?.jobPosition}
        </h2>
        <h3 className="text-sm sm:text-md text-gray-700 mt-1">
          Years of Experience: {interview?.jobExperience}
        </h3>
        <h4 className="text-xs sm:text-sm text-gray-500 mt-2">
          Created At: {interview?.createdat}
        </h4>
      </div>
      <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:justify-between sm:items-center sm:gap-2 lg:gap-4">
        <Button
          size="sm"
          variant="outline"
          className="w-full sm:w-1/2 lg:w-auto text-gray-700 border-gray-300 hover:bg-gray-100 transition-all"
          onClick={onFeedbackPress}
        >
          Interview Insights
        </Button>
        <Button
          size="sm"
          className="w-full sm:w-1/2 lg:w-auto bg-gray-800 text-white hover:bg-gray-700 transition-all"
          onClick={onStartInterview}
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default Interviewcard;
