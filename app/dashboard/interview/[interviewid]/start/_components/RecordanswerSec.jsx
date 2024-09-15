"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, MicOff } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";

function RecordanswerSec({mockinterviewquestion,activequestionindex}) {
  const [useranswer, setuseranswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setuseranswer((prevans) => prevans + result?.transcript);
    });
  }, [results]);

   const saveuseranswer= async()=>{
    if(isRecording){
      stopSpeechToText();
      if(useranswer?.length<10){
        toast('Error saving your answer,Please record again Try to Speak a bit more')
        return;
      }
      const feedbackprompt = "Question: "+mockinterviewquestion[activequestionindex]?.Question+", User Answer: "+useranswer+", Depends on question and user answer for give interview question"+"please give us performance rating and insights and feedback and feedback as arear of improvment and also provide that is language tone good or needs improvement and provide all the interview insights"+"in just 6 to 8 lines to improve it in JSON format with rating field and feedback field";
      const result = await chatSession.sendMessage(feedbackprompt);
      const MockjsonResp=(result.response.text()).replace("```json", "").replace("```", "");
      console.log(MockjsonResp);
    }
    else{
      startSpeechToText();
    }
   }

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
      <motion.div
        className="my-5"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 ${
            isRecording
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } rounded-full`}
          variant="outline"
          onClick={saveuseranswer}
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
