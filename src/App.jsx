
import { useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import Hero from "./components/Hero";
import JokeCards from "./components/JokeCards";
import QuestionCard from "./components/QuestionCard";
import SuccessScreen from "./components/SuccessScreen";

const questions = [
  {
    question: "Do you want me to stop caring about you?",
    yes: "Good! Because that's not happening anyway.",
    no: "Too late! Caring mode is permanently activated.",
  },
  {
    question: "Would you like to come with me on the bus today?",
    yes: "Bus journey officially saved!",
    no: "Even the bus is waiting for you!",
  },
  {
    question: "Can we forget this fight and start smiling again?",
    yes: "That's the answer I was waiting for!",
    no: "Friendship is too precious to give up!",
  },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [success, setSuccess] = useState(false);

  const handleYes = () => {
    setAnswers((prev) => ({
      ...prev,
      [current]: "yes",
    }));

    if (current === 2) {
      setSuccess(true);
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (current < 2) {
      setCurrent((prev) => prev + 1);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080611] text-white">
     <AnimatedBackground />

      <div className="relative bachkdrop-filter:blur-[100px] z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-8 md:px-10">

        <header className="flex items-center justify-between">
          <a href="/" className="text-lg font-black tracking-tight">
            FRIENDSHIP<span className="text-pink-400">.</span>
          </a>

          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs tracking-widest text-white/60">
            SPECIAL EDITION / 001
          </span>
        </header>

        {!success ? (
          <>
            <Hero />

            <JokeCards />

            <section className="mx-auto mt-12 w-full max-w-2xl pb-12">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs tracking-[0.3em] text-white/40">
                  FRIENDSHIP TEST
                </span>

                <span className="text-xs text-pink-300">
                  0{current + 1} / 03
                </span>
              </div>

              <div className="mb-7 flex gap-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                      index <= current
                        ? "bg-gradient-to-r from-pink-500 to-violet-500"
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </div>

              <QuestionCard
                key={current}
                question={questions[current]}
                questionNumber={current}
                onYes={handleYes}
                onNext={handleNext}
              />

              {answers[current] && (
                <p className="mt-5 text-center text-sm text-pink-200">
                  {questions[current].yes}
                </p>
              )}
            </section>
          </>
        ) : (
          <SuccessScreen />
        )}

        <footer className="mt-auto border-t border-white/10 py-6 text-center text-xs tracking-widest text-white/30">
          MADE WITH CARE · FRIENDSHIP NEVER EXPIRES
        </footer>
      </div>
    </main>
  );
}
