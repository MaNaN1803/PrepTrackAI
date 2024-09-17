"use client";
import Image from "next/image";

function InterviewGuide() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto p-8">
        {/* Introduction */}
        <section className="mb-12 border-b-4 border-blue-500 pb-6">
          <h1 className="text-4xl font-bold text-center text-purple-400 mb-6">
            Ultimate Interview Guide
          </h1>
          <p className="text-lg leading-relaxed">
            Welcome to the Ultimate Interview Guide! This page provides comprehensive
            information and guidance to help you succeed in your interviews. Whether
            you're preparing for a technical interview, a behavioral interview, or
            anything in between, you'll find valuable insights and tips here.
          </p>
        </section>

        {/* Preparation Tips */}
        <section className="mb-12 border-b-4 border-blue-500 pb-6">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">Preparation Tips</h2>
          <ul className="list-disc pl-5 space-y-4">
            <li>
              <strong>Research the Company:</strong> Understand the company's mission, values, and recent news. This shows your interest and helps tailor your responses.
            </li>
            <li>
              <strong>Understand the Role:</strong> Know the job description and required skills. Align your experiences and skills with the job requirements.
            </li>
            <li>
              <strong>Practice Common Questions:</strong> Prepare answers for common interview questions and practice them to gain confidence.
            </li>
            <li>
              <strong>Prepare Your Questions:</strong> Have thoughtful questions ready to ask the interviewer. This shows your interest and helps you learn more about the role.
            </li>
          </ul>
        </section>

        {/* Types of Interviews */}
        <section className="mb-12 border-b-4 border-blue-500 pb-6">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">Types of Interviews</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-purple-300">Technical Interviews</h3>
              <p>
                Technical interviews assess your problem-solving skills and technical knowledge. Be prepared to solve coding problems, explain your thought process, and discuss technical concepts.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-purple-300">Behavioral Interviews</h3>
              <p>
                Behavioral interviews focus on your past experiences and how you handle various situations. Use the STAR method (Situation, Task, Action, Result) to structure your answers.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-purple-300">Panel Interviews</h3>
              <p>
                In panel interviews, you'll meet with multiple interviewers at once. Each interviewer may focus on different aspects of your skills and experiences.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-purple-300">Case Interviews</h3>
              <p>
                Case interviews involve solving a business problem or case study. Demonstrate your analytical skills, problem-solving abilities, and business acumen.
              </p>
            </div>
          </div>
        </section>

        {/* Common Questions */}
        <section className="mb-12 border-b-4 border-blue-500 pb-6">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">Common Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-purple-300">Tell Me About Yourself</h3>
              <p>
                Craft a concise and engaging summary of your professional background, focusing on key accomplishments and skills relevant to the role.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-purple-300">What Are Your Strengths and Weaknesses?</h3>
              <p>
                Highlight strengths that align with the job requirements and discuss weaknesses honestly while showing how you're working to improve them.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-purple-300">Describe a Challenging Situation and How You Handled It</h3>
              <p>
                Use the STAR method to describe a specific challenge, your approach to handling it, and the outcome.
              </p>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="mb-12 border-b-4 border-blue-500 pb-6">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">Success Strategies</h2>
          <ul className="list-disc pl-5 space-y-4">
            <li>
              <strong>Be On Time:</strong> Arrive early for the interview to show punctuality and reduce stress.
            </li>
            <li>
              <strong>Dress Appropriately:</strong> Wear professional attire suitable for the company culture and role.
            </li>
            <li>
              <strong>Communicate Clearly:</strong> Articulate your thoughts clearly and concisely. Avoid jargon and be direct.
            </li>
            <li>
              <strong>Follow Up:</strong> Send a thank-you note or email after the interview to express your appreciation and reiterate your interest in the position.
            </li>
          </ul>
        </section>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">Additional Resources</h2>
          <ul className="list-disc pl-5 space-y-4">
            <li>
              <a href="https://example.com/interview-preparation-guide" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Comprehensive Interview Preparation Guide
              </a>
            </li>
            <li>
              <a href="https://example.com/top-interview-questions" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Top 50 Interview Questions and Answers
              </a>
            </li>
            <li>
              <a href="https://example.com/interview-success-stories" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Success Stories and Tips from Interviewees
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default InterviewGuide;
