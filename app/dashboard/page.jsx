
import React from 'react';
import Addnewinterview from './_components/Addnewinterview';
import Interviewlist from './_components/Interviewlist';
import Link from 'next/link';

async function Dashboard() {
 
  return (
    <div className="p-10 bg-white min-h-screen flex flex-col items-center text-gray-800">
      {/* Header section */}
      <div className="text-center mb-10">
        <h2 className="font-bold text-5xl text-blue-600 flex items-center justify-center gap-2">
          Dashboard 🚀
        </h2>
        <p className="text-gray-600 text-lg mt-2">
          Welcome Aboard !! Ready for your next interview? 🎯
        </p>
      </div>

      {/* Motivational Quote Section */}
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-10 max-w-3xl w-full border-l-4 border-blue-500">
        <blockquote className="italic text-xl text-gray-700 border-l-4 border-blue-500 pl-4">
          "Ace every interview, shape your future — with{' '}
          <span className="font-extrabold text-blue-500">PrepTrackAI</span>, success is just a step away."
        </blockquote>
        <cite className="text-right block mt-2 text-gray-500">- Manan Telrandhe</cite>
      </div>

      {/* Add New Interview Section */}
      <div className="w-full mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Start a New Interview 📝
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Addnewinterview />
        </div>
      </div>

      {/* Past Interview Section */}
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 max-w-4xl w-full border-l-4 border-blue-500">
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
          Your Previous Interviews 👨🏻‍💻
        </h3>
        <p className="text-gray-600 mb-4">
          Review and analyze your past interviews to keep improving 💡
        </p>
        <Interviewlist />
      </div>

      {/* Footer Section */}
      <div className="mt-10 text-center">
        <p className="text-gray-500 text-sm mb-2">
          Powered by PrepTrackAI © {new Date().getFullYear()} | All rights reserved 🌟
        </p>
        <Link href={'https://bit.ly/manan_dev'}>
        <p className="text-gray-600 text-xs">
          Created by <span className="font-bold text-blue-500">- Manan Telrandhe</span>
        </p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
