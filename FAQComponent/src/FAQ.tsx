import FAQCard from "./FAQCard";

export interface IFAQAndAnswers {
  answer: string;
  question: string;
}

export default function FAQ({
  FAQAndAnswers,
}: {
  FAQAndAnswers: IFAQAndAnswers[];
}) {
  return (
    <section className="faqContainer">
      <h1>Frequently Asked Questions</h1>
      <section className="faqSubContainer">
        {FAQAndAnswers.map((FAQAndAnswers, index) => {
          return (
            <FAQCard index={index} key={index} FAQAndAnswers={FAQAndAnswers} />
          );
        })}
      </section>
    </section>
  );
}
