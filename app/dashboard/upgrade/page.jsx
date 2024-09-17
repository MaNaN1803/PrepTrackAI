"use client";

function Upgrade() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-purple-400 mb-10">
          Upgrade to Premium
        </h1>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 border-b-4 border-blue-500 pb-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Exclusive Features</h2>
            <ul className="space-y-4">
              <li>✓ Advanced AI Interview Feedback</li>
              <li>✓ In-depth Performance Analysis</li>
              <li>✓ Personalized Coaching Sessions</li>
              <li>✓ Mock Interviews with Real Professionals</li>
              <li>✓ Access to Premium Resources</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Why Go Premium?</h2>
            <p>
              Upgrade to unlock the full potential of PrepTrackAI. Whether you
              are preparing for a job interview or improving your interview
              skills, the premium version provides a personalized and powerful
              experience tailored to your goals.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mt-2">
          <h3 className="text-3xl font-bold text-center text-purple-400">Pricing</h3>
          <p className="text-center mt-2">
            Choose the plan that best suits your needs.
          </p>
          <div className="flex justify-center mt-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center border-4 border-blue-500">
              <h4 className="text-xl font-bold mb-4 text-purple-400">Premium Plan</h4>
              <p className="text-lg mb-4">$19.99 / month</p>
              <button className="bg-purple-400 text-gray-900 py-2 px-4 rounded-md hover:bg-purple-300 hover:text-gray-900 transition-all">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
