"use client";
import Image from "next/image";

function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-purple-400 mb-10">
          How PrepTrackAI Works
        </h1>

        {/* Step-by-Step Process */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center border-4 border-blue-500 p-4 rounded-lg">
            <Image src="/step1.png" width={100} height={100} alt="Step 1" />
            <h2 className="text-2xl font-bold mt-4 text-purple-400">Step 1</h2>
            <p className="mt-2 text-lg">
              Select the interview type and configure your mock interview settings.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center border-4 border-blue-500 p-4 rounded-lg">
            <Image src="/step2.png" width={100} height={100} alt="Step 2" />
            <h2 className="text-2xl font-bold mt-4 text-purple-400">Step 2</h2>
            <p className="mt-2 text-lg">
              Engage with AI-powered interview questions and record your answers.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center border-4 border-blue-500 p-4 rounded-lg">
            <Image src="/step3.png" width={100} height={100} alt="Step 3" />
            <h2 className="text-2xl font-bold mt-4 text-purple-400">Step 3</h2>
            <p className="mt-2 text-lg">
              Receive personalized feedback on your performance and areas to improve.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-purple-400">
            Ready to ace your next interview?
          </h3>
          <p className="mt-2 text-lg">Get started with PrepTrackAI today!</p>
          <div className="mt-8">
            <Image
              src="/inter.png"
              width={500}
              height={200}
              alt="Exciting Animation"
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
