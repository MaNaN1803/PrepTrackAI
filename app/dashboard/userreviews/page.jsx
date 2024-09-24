"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { UserReviews } from "@/utils/schema";
import Image from 'next/image';

function UserReviewsPage() {
  const { user } = useUser();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await db
          .select()
          .from(UserReviews)
          .orderBy("created_at", "desc") 
          .execute();

          const reviewsWithParsedDates = fetchedReviews.map(review => ({
          ...review,
          createdAt: new Date(review.createdAt), 
        }));

        setReviews(reviewsWithParsedDates);
        console.log("Fetched Reviews:", reviewsWithParsedDates); 
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };
    fetchReviews();
  }, []);

  
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!newReview.trim() || !user) return;

    setIsSubmitting(true);

    try {
      const newReviewEntry = {
        reviewText: newReview,
        username: user.username || user.fullName || user.primaryEmailAddress?.emailAddress,
        userEmail: user.primaryEmailAddress?.emailAddress,
        avatarUrl: user.profileImageUrl,
        createdAt: new Date(), 
      };

      
      await db.insert(UserReviews).values(newReviewEntry);

 
      setReviews((prevReviews) => [
        { ...newReviewEntry, id: prevReviews.length ? Math.max(...prevReviews.map(r => r.id)) + 1 : 1 }, // Adjust ID if necessary
        ...prevReviews,
      ]);

      setNewReview("");
      setIsSubmitting(false);
      setIsFormVisible(false); 
    } catch (error) {
      console.error("Failed to save review", error);
      setError("Failed to submit review. Please try again.");
      setIsSubmitting(false);
    }
  };

  
  const handleDeleteReview = async (id) => {
    try {
      console.log("Deleting review with id:", id);
      

      const deleted = await db.delete(UserReviews).where(eq(UserReviews.id, id)).execute();
      
  
      if (deleted.count > 0) {
          setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
      } else {
          setError("Failed to delete review. Review not found.");
      }
    } catch (error) {
      console.error("Failed to delete review", error);
      setError("Failed to delete review. Please try again.");
    }
  };

  return (
    <div className="p-8 mt-2 max-w-4xl mx-auto bg-black rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-purple-500 text-center">User Reviews</h1>

   
      <div className="flex justify-center mb-6">
        <Image
          src="/reviewform.png"
          alt="Review Form Icon"
          width={50}
          height={50}
          className="cursor-pointer"
          onClick={() => setIsFormVisible(!isFormVisible)} 
        />
        <h1 className="justify-center mt-3 text-white">
          Press the icon to write the review
        </h1>
      </div>

    
      {isFormVisible && (
        <form onSubmit={handleSubmitReview} className="mb-8 transition-all">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-4 border border-gray-700 bg-black text-white rounded-md"
            rows={4}
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-700 transition"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      <div className="text-center my-8 text-gray-300 italic text-lg">
        "Your feedback shapes the future. Share your thoughts and help us grow!"
      </div>

  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-gray-900 border border-purple-700 rounded-md flex flex-col gap-4 shadow-lg transition-transform transform hover:scale-105"
            >
           
              <div className="flex-shrink-0 self-center">
                <img
                  src={review.avatarUrl || "/reviewuser.png"}
                  alt={`${review.username}'s avatar`}
                  className="w-16 h-16 rounded-full border-2 border-purple-500"
                />
              </div>

           
              <div className="flex-grow text-center">
                <p className="font-bold text-purple-400">{review.username}</p>
                <p className="text-gray-300">{review.reviewText}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()} {new Date(review.createdAt).toLocaleTimeString()} 
                </p>
              </div>

           
              {user?.emailAddresses?.some(email => email.emailAddress === review.userEmail) && (
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="px-2 py-1 text-red-500 hover:bg-red-600 hover:text-white rounded transition"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
        )}
      </div>

    
      <div className="text-center mt-10">
        <p className="text-2xl text-purple-400 font-semibold">
          "Every voice matters. Your reviews inspire others!"
        </p>
      </div>
    </div>
  );
}

export default UserReviewsPage;
