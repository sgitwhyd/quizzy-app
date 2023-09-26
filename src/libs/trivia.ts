import { shuffleArray } from "../utils";
import { Question } from "../types";
import { category, difficulty, numberOfQuestion } from "../constant";

const BASE_URL = `https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${category}&difficulty=${difficulty}&type=multiple`;

type QuestionsResponseApi = {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
};

export const fetchQuestionsData = async (): Promise<Question[]> => {
	const response = await fetch(BASE_URL);
	const data = await response.json();
	const questions: QuestionsResponseApi[] = data.results;

	return questions.map((question) => ({
		...question,
		answers: shuffleArray([
			...question.incorrect_answers,
			question.correct_answer,
		]),
	}));
};
