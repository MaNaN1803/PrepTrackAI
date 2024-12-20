"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/app/dashboard/_components/Header";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/utils/db"; // Import your db instance
import { UserReviews } from "@/utils/schema"; // Import UserReviews table schema

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    // Simulate a loading time of 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Fetch the latest 3 reviews from the database
    const fetchLatestReviews = async () => {
      try {
        const fetchedReviews = await db
          .select({
            id: UserReviews.id,
            reviewText: UserReviews.reviewText,
            username: UserReviews.username,
            createdAt: UserReviews.createdAt,
          })
          .from(UserReviews)
          .execute(); // Fetch all reviews

          // Sort reviews by id in descending order and take the top 3
          const sortedReviews = fetchedReviews
            .sort((a, b) => b.id - a.id)
            .slice(0, 3); // Get the top 3 reviews
  
          console.log("Fetched Reviews: ", sortedReviews); // Debugging line to check if reviews are fetched
          setReviews(sortedReviews);
      } catch (error) {
        console.error("Failed to fetch latest reviews", error);
      }
    };

    fetchLatestReviews();
  }, []); // Empty dependency array ensures this runs once on page load

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-black to-gray-700">
        <div className="text-center animate-pulse">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-100 via-white to-purple-500 bg-clip-text text-transparent">
            ACE 🎯 INTERVIEWS 👨🏻‍💻 INSTANTLY 🚀!!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mt-12 mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fadeIn text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Welcome to ,</h1>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              <span className="bg-gradient-to-r from-blue-100 via-white to-purple-500 bg-clip-text text-transparent">
                PrepTrackAI
              </span>
            </h1>
            <p className="text-xl font-semibold md:text-2xl mb-8 text-gray-300">
              Ace your interviews with AI-powered insights, feedback, and mock practice. Start now and be interview-ready!
            </p>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-blue-100 via-white to-purple-500 text-black px-8 py-4 font-semibold text-lg rounded-full hover:bg-gray-400 transition duration-300 shadow-xl">
                Start Your Journey
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/master1.png"
              alt="Hero Image"
              width={800}
              height={800}
              className="mx-auto drop-shadow-2xl animate-slideInRight w-full max-w-sm md:max-w-full"
            />
          </div>
        </div>

        {/* Chatbot Icon */}
      <div
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex items-center space-x-2 md:space-x-4"
      >
        {/* Chatbot Icon */}
        <button
          onClick={() => setShowChatbot((prev) => !prev)} 
          className="focus:outline-none"
        >
          <img
            src="/chat-bot.png" 
            alt="Chatbot Icon"
            className="w-16 h-16 hover:scale-110 transition-transform duration-300"
          />
        </button>

       
        {!showChatbot && (
          <p className="hidden md:block text-lg font-semibold text-gray-300">
            Chatbot to help you guide about PrepTrackAI
          </p>
        )}
      </div>

      
      {showChatbot && (
        <div className="fixed bottom-20 right-4 md:bottom-24 md:right-8 w-[90%] max-w-md h-[70vh] bg-white shadow-lg rounded-lg z-50">
          <iframe
            src="https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=a7e2a0d2-f1aa-4f62-8410-58c86f933102"
            title="PrepTrackAI Chatbot"
            width="100%"
            height="100%"
            className="rounded-lg"
          />
          <button
            className="absolute top-2 right-2 text-black bg-gray-200 p-1 rounded-full"
            onClick={() => setShowChatbot(false)}
          >
            ✖️
          </button>
        </div>
      )}



      </section>



      {/* Features Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-r from-black via-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-200">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-gray-900 shadow-lg p-6 md:p-8 rounded-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-yellow-400">AI Feedback 🤖</h3>
              <p className="text-gray-400">Receive detailed and personalized feedback after each mock interview.</p>
            </div>
            <div className="bg-gray-900 shadow-lg p-6 md:p-8 rounded-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-yellow-400">Interview Insights 🧠</h3>
              <p className="text-gray-400">Get tailored insights to identify your strengths and weaknesses.</p>
            </div>
            <div className="bg-gray-900 shadow-lg p-6 md:p-8 rounded-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-yellow-400">Mock Interviews 🎤</h3>
              <p className="text-gray-400">Practice with real-world mock questions to enhance your interview skills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-yellow-400">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Render latest reviews dynamically */}
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="bg-gray-900 text-gray-300 p-6 md:p-8 rounded-lg shadow-xl">
                  <p className="text-lg mb-4">{`"${review.reviewText}"`}</p>
                  <cite className="block mt-2 text-gray-500">- {review.username || "Anonymous"}</cite>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-black text-gray-300 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400">Ready to Level Up? 🏆</h2>
        <p className="text-lg mb-6">Join PrepTrackAI now and take your interview preparation to the next level! 🎯</p>
        <Link href="/dashboard">
          <Button className="bg-yellow-400 text-black px-8 py-4 font-semibold text-lg rounded-full hover:bg-yellow-300 transition duration-300 shadow-xl">
            Get Started
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} PrepTrackAI. All rights reserved.</p>
          <p>
            Developed by{" "}
            <Link href="https://bit.ly/manan_dev" className="text-blue-400 hover:text-yellow-300 transition duration-300">
              Manan Telrandhe
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
