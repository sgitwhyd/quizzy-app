import UserLoggedbutton from "./user-logged-toggle";
import Timer from "./timer";
import { getFromLocalStorage } from "../utils";

const Navigation = () => {
	const isQuizStart = getFromLocalStorage("isQuizStart") || false;
	const isQuizFinish = getFromLocalStorage("isQuizFinished") || false;

	return (
		<div className="bg-purple-700 w-full h-16 flex items-center px-3 md:px-12  text-white relative">
			<div className="font-bold text-lg md:text-2xl">
				<a href="/">Quizzy App</a>
			</div>
			<div className="ml-auto flex md:gap-3 items-center">
				<div className="">
					{isQuizStart && !isQuizFinish ? <Timer /> : null}
				</div>
				<div className="">
					<UserLoggedbutton />
				</div>
			</div>
		</div>
	);
};

export default Navigation;
