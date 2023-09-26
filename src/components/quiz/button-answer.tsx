/* eslint-disable @typescript-eslint/ban-types */
type ButtonAnswerProps = {
	answer: string;
	handleNextQuestionAndCheckAnswer: (
		event: React.MouseEvent<HTMLButtonElement>
	) => void;
};

const ButtonAnswer = ({
	answer,
	handleNextQuestionAndCheckAnswer,
}: ButtonAnswerProps) => {
	return (
		<button
			key={answer}
			value={answer}
			className="bg-purple-700 hover:bg-purple-800 text-center py-3 px-4 rounded-lg text-white font-bold"
			onClick={handleNextQuestionAndCheckAnswer}
			dangerouslySetInnerHTML={{
				__html: answer,
			}}></button>
	);
};

export default ButtonAnswer;
