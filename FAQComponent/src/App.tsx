// Create a re-usable "Frequently Asked Questions" component
// It should receive an array of question/answer objects, e.g.

// [
//   {
//     question: "How many bones does a cat have?",
//     answer: "A cat has 230 bones - 6 more than a human",
//   },
//   {
//     question: "How much do cats sleep?",
//     answer: "The average cat sleeps 12-16 hours per day",
//   },
//   {
//     question: "How long do cats live",
//     answer: "Outdoor cats live 5 years on average. Indoor\ncats live 15 years on average.",
//   },
// ]
// These should be rendered in the FAQ component, where clicking any question reveals the answer, and clicking again will hide it.

// Requirements
// The FAQ component should receive the list of questions in the JS object format above
// Every question from the object should be displayed, with an adjacent chevron as in the mockup
// Clicking any question should reveal the answer
// Clicking a question again should hide the answer
// The first answer should be revealed by default

import FAQ from "./FAQ";

export default function App() {
  const FAQAndAnswers = [
    {
      question: "How many bones does a cat have?",
      answer: "A cat has 230 bones - 6 more than a human",
    },
    {
      question: "How much do cats sleep?",
      answer: "The average cat sleeps 12-16 hours per day",
    },
    {
      question: "How long do cats live",
      answer:
        "Outdoor cats live 5 years on average. Indoor\ncats live 15 years on average.",
    },
  ];
  return (
    <>
      <FAQ FAQAndAnswers={FAQAndAnswers} />
    </>
  );
}
