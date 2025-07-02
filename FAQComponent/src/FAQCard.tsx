import { useState } from "react";
import { type IFAQAndAnswers } from "./FAQ";

export default function FAQCard({
  FAQAndAnswers,
  index,
}: {
  FAQAndAnswers: IFAQAndAnswers;
  index: number;
}) {
  const [isRevealed, setIsRevealed] = useState(index === 0 ? true : false);

  return (
    <article className="faq">
      <section className="question" onClick={() => setIsRevealed(!isRevealed)}>
        {isRevealed ? <span>&#x25BC;</span> : <span>&#x25BA;</span>}
        {FAQAndAnswers.question}
      </section>

      {isRevealed ? (
        <section className="answer">{FAQAndAnswers.answer}</section>
      ) : (
        ""
      )}
    </article>
  );
}
