/* eslint-disable @typescript-eslint/ban-types */
import ButtonAnswer from "./button-answer";
import { Question } from "../../types";

type QuizCardProps = {
	question: Question;
	handleNextQuestionAndCheckAnswer: (
		event: React.MouseEvent<HTMLButtonElement>
	) => void;
};

const QuizCard = ({
	question,
	handleNextQuestionAndCheckAnswer,
}: QuizCardProps) => {
	return (
		<div className="flex justify-center flex-col items-center px-6">
			<div
				className="text-xl md:text-3xl text-center w-full max-w-4xl font-semibold"
				dangerouslySetInnerHTML={{
					__html: question?.question as string,
				}}></div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-2xl w-full mt-5 ">
				{question?.answers.map((item) => (
					<ButtonAnswer
						answer={item}
						key={item}
						handleNextQuestionAndCheckAnswer={handleNextQuestionAndCheckAnswer}
					/>
				))}
			</div>
		</div>
	);
};

export default QuizCard;
