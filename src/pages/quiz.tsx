import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PageLayout from "../components/PageLayout";
import QuizCard from "../components/quiz/quiz-card";
import { fetchQuestionsData } from "../libs/trivia";
import { putToLocalStorage, getFromLocalStorage } from "../utils";
import { Question } from "../types";

const Quiz = () => {
	const [isQuizStart, setIsQuizStart] = useState(
		localStorage.getItem("isQuizStart") ? true : false
	);
	const [isQuizFinished, setIsQuizFinished] = useState(
		getFromLocalStorage("isQuizFinished") ? true : false
	);
	const [isLoading, setIsLoading] = useState(true);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [question, setQuestion] = useState<Question>();
	const [questionNumber, setQuestionNumber] = useState(
		!getFromLocalStorage("questionNumber")
			? 0
			: Number(getFromLocalStorage("questionNumber"))
	);
	const [correctQuestions, setCorrectQuestions] = useState<Question[]>([]);

	const startQuiz = () => {
		localStorage.setItem("isQuizStart", JSON.stringify(true));
		putToLocalStorage("questionNumber", questionNumber);
		setQuestionNumber(0);
		setIsQuizStart(true);
	};

	const handleNextQuestionAndCheckAnswer = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		const answer = event.currentTarget.value;
		const isCorrect = answer === question?.correct_answer;

		if (isCorrect) {
			setCorrectQuestions([...correctQuestions, question]);
			putToLocalStorage(
				"correctQuestions",
				JSON.stringify([...correctQuestions, question])
			);
		}

		if (questionNumber === questions.length - 1) {
			setIsQuizFinished(true);
			putToLocalStorage("isQuizFinished", true);
		} else {
			setQuestionNumber((prev) => prev + 1);
			putToLocalStorage("questionNumber", questionNumber + 1);
		}
	};

	useEffect(() => {
		if (questions) {
			setQuestion(questions[questionNumber]);
		}
	}, [questionNumber, questions]);

	useEffect(() => {
		try {
			setIsLoading(true);
			(async () => {
				const questions = await fetchQuestionsData();
				setQuestions(questions);
			})();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	if (isQuizFinished) {
		return (
			<PageLayout>
				<div className="flex flex-col gap-5 h-[calc(100vh-64px)] items-center justify-center">
					<h1 className="text-4xl font-bold text-white">Quiz Finished</h1>
					<Link
						to="/quiz/result"
						className="bg-purple-700 py-3 px-5 rounded-md font-semibold text-white text-xl">
						See Result Here
					</Link>
				</div>
			</PageLayout>
		);
	}

	return (
		<PageLayout>
			<div className="flex flex-col gap-5 h-[calc(100vh-64px)] items-center justify-center">
				{isQuizStart ? (
					<>
						<h1 className="font-semibold text-xl md:text-2xl">
							Questions {questionNumber + 1} / {questions.length}
						</h1>
						{isLoading ? (
							<div className="text-2xl font-semibold"> Loading....</div>
						) : (
							<QuizCard
								question={question as Question}
								handleNextQuestionAndCheckAnswer={
									handleNextQuestionAndCheckAnswer
								}
							/>
						)}
					</>
				) : (
					<button
						className="bg-purple-700 py-3 px-5 rounded-md font-bold text-xl text-white"
						onClick={startQuiz}>
						Start Quiz
					</button>
				)}
			</div>
		</PageLayout>
	);
};

export default Quiz;
