import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { putToLocalStorage, getFromLocalStorage } from "../utils";

const Timer = () => {
	const navigate = useNavigate();
	const timer = {
		minutes: 1,
	};

	const [seconds, setSeconds] = useState(
		getFromLocalStorage("time")
			? Number(getFromLocalStorage("time"))
			: timer.minutes * 60
	);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
				putToLocalStorage("time", seconds - 1);
			} else {
				clearInterval(intervalId);
				putToLocalStorage("isQuizFinished", true);
				navigate("/quiz/result");
			}
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [seconds, navigate]);

	const minutes = Math.floor(seconds / 60);
	const secondsRemaining = seconds % 60;

	const minutesDisplay = String(minutes).padStart(2, "0");
	const secondsDisplay = String(secondsRemaining).padStart(2, "0");
	return (
		<div>
			{minutesDisplay}:{secondsDisplay}
		</div>
	);
};

export default Timer;
