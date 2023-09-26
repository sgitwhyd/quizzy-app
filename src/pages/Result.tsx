import { useEffect } from "react";

import { getFromLocalStorage } from "../utils";
import PageLayout from "../components/PageLayout";
import { Question } from "../types";
import { deleteFromLocalStorage } from "../utils";
import { useNavigate } from "react-router-dom";
import { numberOfQuestion } from "../constant";

const Result = () => {
	const navigate = useNavigate();
	const correctQuestions: Question[] = getFromLocalStorage("correctQuestions")
		? JSON.parse(getFromLocalStorage("correctQuestions") as string)
		: null;
	const isQuizFinished = getFromLocalStorage("isQuizFinished");
	const numberOfAnswer = Number(getFromLocalStorage("questionNumber")) + 1;
	const timeIsOver = Number(getFromLocalStorage("time")) === 0 ? true : false;

	useEffect(() => {
		if (!isQuizFinished) {
			navigate("/quiz");
		}
	}, [isQuizFinished, navigate]);

	const handleStartNewQuiz = () => {
		const itemToDelete = [
			"isQuizFinished",
			"isQuizStart",
			"correctQuestions",
			"questionNumber",
			"time",
		];

		itemToDelete.map((item) => {
			deleteFromLocalStorage(item);
		});

		navigate("/quiz");
	};

	return (
		<PageLayout>
			<div className="flex flex-col gap-5  items-center  text-white mt-20 p-6">
				{timeIsOver && <h1>Opsss.. Your Time Is Over...</h1>}
				<h1 className="text-4xl font-semibold">Result</h1>
				<div className="flex  justify-center flex-col-reverse md:flex-row fle gap-10 w-full max-w-5xl mx-auto">
					<div className="">
						<h1 className="text-lg md:text-xl mb-5">Your Correct Answer is</h1>
						<div className="flex flex-col space-y-5 max-h-[400px] h-full overflow-y-auto">
							{correctQuestions ? (
								correctQuestions.map((question, index) => (
									<div
										className="flex gap-5 items-start w-full max-w-lg"
										key={question.question}>
										<div className="w-12 h-9 flex justify-center items-center border border-purple-700 text-lg font-semibold">
											{index + 1}
										</div>
										<div
											className="flex flex-col text-xl flex-1"
											key={question.question}>
											<div
												className=""
												dangerouslySetInnerHTML={{
													__html: question.question,
												}}></div>
											<div className="flex flex-col gap-3 mt-3 text-lg">
												{question.answers.map((item) => (
													<div
														key={item}
														className={`${
															question.correct_answer === item
																? "italic font-semibold"
																: null
														}`}
														dangerouslySetInnerHTML={{
															__html: `${item} ${
																question.correct_answer === item
																	? "(Correct Answer)"
																	: ""
															}`,
														}}></div>
												))}
											</div>
										</div>
									</div>
								))
							) : (
								<div className="text-center">No Correct Answer</div>
							)}
						</div>
					</div>
					<div className="flex flex-col items-center justify-center relative gap-5">
						<div className="flex flex-col items-start gap-3">
							<h1 className="font-semibold text-xl">
								Correct Answer: {correctQuestions ? correctQuestions.length : 0}{" "}
							</h1>
							<h1 className="font-semibold text-xl">
								Incorrect Answer:{" "}
								{Number(numberOfQuestion) -
									(correctQuestions ? correctQuestions.length : 0)}
							</h1>
							<h1 className="font-semibold text-xl">
								{" "}
								Number Of Answer : {numberOfAnswer}
							</h1>
							<h2 className="text-lg">
								Score : {correctQuestions ? correctQuestions.length * 10 : 0}
							</h2>
						</div>
						<button
							className="bg-purple-700 py-3 px-5 rounded-md font-semibold text-white text-xl "
							onClick={handleStartNewQuiz}>
							Start New Quiz
						</button>
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default Result;
