/* eslint-disable @typescript-eslint/ban-types */
import { deleteFromLocalStorage } from "../utils";

const allowedCredential = {
	email: "testing@developer.com",
	password: "123456",
};

type SignInResponse = {
	email: string;
	name: string;
	token: number;
	error?: boolean;
	msg?: string;
};

const fakeLoginRequest = (
	email: string,
	password: string
): Promise<SignInResponse> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (
				email === allowedCredential.email &&
				password === allowedCredential.password
			) {
				resolve({
					email,
					name: "Developer",
					token: Math.floor(Math.random() * 60 + 9999),
				});
			} else {
				reject("Invalid email or password");
			}
		}, 2000);
	});
};

export const signIn = async (
	email: string,
	password: string
): Promise<SignInResponse> => {
	return await fakeLoginRequest(email, password);
};

export const signOut = (callback: () => void) => {
	const itemToDelete = [
		"isQuizFinished",
		"isQuizStart",
		"correctQuestions",
		"questionNumber",
		"time",
		"credential",
		"token",
	];

	itemToDelete.map((item) => {
		deleteFromLocalStorage(item);
	});

	callback();
};
