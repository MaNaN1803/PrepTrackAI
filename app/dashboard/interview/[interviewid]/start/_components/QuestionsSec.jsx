import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSec({ mockinterviewquestion, activequestionindex, setactivequestionindex }) {
  // Get the environment variable
  const questionNote = process.env.NEXT_PUBLIC_Questionnote;

  const textToSpeach = (text) => {
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  return (
    mockinterviewquestion && mockinterviewquestion.length > 0 ? (
      <div className="p-6 bg-white shadow-lg rounded-lg w-full">
        {/* Info Note with Lightbulb Icon */}
        <div className="flex items-center mb-5 p-4 bg-blue-50 border border-blue-300 rounded-lg text-blue-700">
          <Lightbulb className="mr-3 text-blue-500" size={90} />
          <p className="text-sm md:text-md">
            {questionNote}
          </p>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockinterviewquestion.map((question, index) => (
            <h2
              key={index}
              onClick={() => setactivequestionindex(index)}
              className={`p-3 bg-blue-500 rounded-full text-xs md:text-sm text-center cursor-pointer transition-all duration-300 ${
                activequestionindex === index ? "bg-black text-white" : ""
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>

        {/* Active Question */}
        <h2 className="mt-6 text-black text-md md:text-lg  dark:text-white">
          {mockinterviewquestion[activequestionindex]?.question || "No question available."}
        </h2>
        <Volume2
          className="cursor-pointer bg-black text-white dark:bg-white text-black"
          onClick={() => textToSpeach(mockinterviewquestion[activequestionindex]?.question)}
        />
      </div>
    ) : (
      <div>No questions available.</div>
    )
  );
}

export default QuestionsSec;
