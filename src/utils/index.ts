/* eslint-disable @typescript-eslint/no-explicit-any */
export const shuffleArray = (data: string[]) => {
	return [...data].sort(() => Math.random() - 0.5);
};

export const putToLocalStorage = (key: string, value: any) => {
	return localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
	return localStorage.getItem(key);
};

export const deleteFromLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};
