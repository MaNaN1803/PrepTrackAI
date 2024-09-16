import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Webcam from "react-webcam";
import { Mic, MicOff } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";

function RecordanswerSec({ mockinterviewquestion, activequestionindex, interviewdata }) {
  const [useranswer, setuseranswer] = useState("");
  const { user } = useUser();
  const [loading, setloading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;

        recognitionInstance.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setuseranswer(transcript);
        };

        recognitionInstance.onend = () => {
          setIsRecording(false);
        };

        setRecognition(recognitionInstance);
      } else {
        console.error("SpeechRecognition is not supported in this browser.");
      }
    }
  }, []);

  const startstoprecording = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  useEffect(() => {
    if (!isRecording && useranswer.length > 10) {
      updateuseranswerindb();
    }
  }, [useranswer, isRecording]);

  const updateuseranswerindb = async () => {
    try {
      if (!useranswer || useranswer.length === 0) {
        console.error("User answer is empty. Cannot save to DB.");
        return;
      }
  
      console.log("User Answer:", useranswer);
  
      const feedbackprompt = `{
        "question": "${mockinterviewquestion[activequestionindex]?.Question}", 
        "userAnswer": "${useranswer}", 
        "request": "Provide a performance rating (out of 10), feedback, areas of improvement, correct answer, and language tone assessment in JSON format with 'rating', 'feedback', 'userAnswer', 'date', and 'correctAnswer' fields."
      }`;
  
      const result = await chatSession.sendMessage(feedbackprompt);
      let textResult;
      if (result && result.response && result.response.text) {
        textResult = await result.response.text();
      } else {
        throw new Error("Text method is not available on the response.");
      }
  
      const cleanJsonText = textResult
        .replace(/```json/, '')
        .replace(/```/, '')
        .trim();
  
      const jsonFeedbackResp = JSON.parse(cleanJsonText);
  
      const userEmail = user?.primaryEmailAddress?.emailAddress || "defaultemail@example.com";
      const createdAt = moment().format("DD-MM-yyyy");
      const correctAnswer = mockinterviewquestion[activequestionindex]?.answer || "No correct answer provided";
  
      // Log the correct answer and feedback to debug null values
      console.log("Correct Answer:", correctAnswer);
      console.log("Feedback:", jsonFeedbackResp?.feedback);
      console.log("Rating:", jsonFeedbackResp?.rating);
  
      const resp = await db.insert(UserAnswer).values({
        mockidref: interviewdata?.mockid,
        question: mockinterviewquestion[activequestionindex]?.Question,
        correctans: correctAnswer,
        userAnswer: useranswer,
        feedback: jsonFeedbackResp?.feedback,
        rating: jsonFeedbackResp?.rating,
        useremail: userEmail,
        createdat: createdAt,
        date: new Date().toISOString(), // Use current date
      });
  
      if (resp) {
        toast.success("Answer Recorded successfully");
        setuseranswer("");
      }
      setloading(false);
    } catch (error) {
      console.error("Error while updating answer:", error);
      toast.error("Something went wrong. Please try again.");
      setloading(false);
    }
  };
  
  
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-lg w-full h-full">
      {/* Webcam Section */}
      <div className="relative flex flex-col justify-center items-center bg-gray-900 rounded-lg p-6 shadow-lg overflow-hidden">
        <motion.div
          className={`absolute inset-0 z-0 rounded-lg bg-gradient-to-br from-black to-blue-600 ${
            isRecording ? "opacity-100" : "opacity-50"
          }`}
          animate={{
            scale: isRecording ? [1, 1.1, 1] : [1, 1],
            opacity: isRecording ? 0.85 : 0.5,
            transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse" },
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Image
            className="absolute mx-auto"
            src={"/webcam.png"}
            alt="webcam"
            width={130}
            height={80}
            style={{ zIndex: 1 }}
          />
          <Webcam
            mirrored={true}
            className="rounded-lg shadow-lg mx-auto"
            style={{
              height: 300,
              width: 400,
              zIndex: 10,
              position: "relative",
            }}
          />
        </div>
      </div>

      {/* Record Button */}
      <motion.div className="my-5" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          disabled={loading}
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 ${
            isRecording
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } rounded-full`}
          variant="outline"
          onClick={startstoprecording}
        >
          {isRecording ? (
            <div className="flex items-center gap-2">
              <Mic className="animate-pulse" />
              <span>Stop Recording...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MicOff />
              <span>Record Answer</span>
            </div>
          )}
        </Button>
      </motion.div>

      {/* User Answer Display */}
      <div className="w-full bg-white p-6 shadow-md rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Answer:</h2>
        <p className="text-md text-gray-600 min-h-[100px]">
          {useranswer || "Your answer will appear here..."}
        </p>
      </div>
    </div>
  );
}

export default RecordanswerSec;
