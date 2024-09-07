import { useState } from "react";
import quiz from "./context"; // Ce fichier contient les questions comme défini précédemment.

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(Number(event.target.value));
    setShowFeedback(false); // Masquer le feedback lors du changement de réponse
  };

  const checkAnswer = () => {
    if (selectedAnswer === quiz[currentQuestion].correctAnswer) {
      setFeedback("Correct !");
    } else {
      setFeedback("Faux, réessayez !");
    }
    setShowFeedback(true); // Afficher le feedback
  };

  const nextQuestion = () => {
    if (
      currentQuestion < quiz.length - 1 &&
      selectedAnswer === quiz[currentQuestion].correctAnswer
    ) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Réinitialiser la sélection de réponse
      setShowFeedback(false); // Masquer le feedback
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="p-4 bg-slate-400 m-8">
      <h2 className="flex justify-center mb-4  ">
        Question {currentQuestion + 1} / {quiz.length}
      </h2>
      <p className="line-clamp-3">{quiz[currentQuestion].question}</p>

      <form className="m-8">
        {quiz[currentQuestion].choices.map((choice, index) => (
          <div className="bg-lime-300 m-4 p-1 text-lg" key={index}>
            <input
              type="checkbox"
              checked={selectedAnswer === index}
              onChange={handleAnswerChange}
              value={index}
              className="p-2 m-1"
            />
            <label>{choice}</label>
          </div>
        ))}
      </form>

      {showFeedback && (
        <p
          className="flex justify-center"
          style={{
            fontWeight: "bold",
            color: feedback === "Correct !" ? "green" : "red",
          }}
        >
          {feedback}
        </p>
      )}

      <div className="p-8 flex justify-center gap-5">
        <button onClick={prevQuestion} disabled={currentQuestion === 0}>
          Revenir
        </button>
        <button onClick={checkAnswer}>Vérifier</button>
        <button
          onClick={nextQuestion}
          disabled={currentQuestion === quiz.length - 1}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Quiz;
