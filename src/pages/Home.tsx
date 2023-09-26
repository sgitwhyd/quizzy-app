import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../libs/auth";
import { getFromLocalStorage, putToLocalStorage } from "../utils";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Home = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>();
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [loginPayload, setLoginPayload] = useState({
		email: "",
		password: "",
	});

	const isLogged = !!getFromLocalStorage("token");

	useEffect(() => {
		if (isLogged) {
			navigate("/quiz");
		}
	}, [isLogged, navigate]);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setLoginPayload({
			...loginPayload,
			[name]: value,
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			setIsLoading(true);
			const result = await signIn(loginPayload.email, loginPayload.password);
			putToLocalStorage("token", result.token);
			putToLocalStorage(
				"credential",
				JSON.stringify({
					name: result.name,
					email: result.email,
				})
			);
			setLoginPayload({
				email: "",
				password: "",
			});
		} catch (error) {
			setIsLoading(false);

			setError(error as string);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full bg-purple-500 min-h-screen flex flex-col items-center justify-center">
			<h1 className="mb-5 text-3xl font-bold text-white">Login Quizzy</h1>
			<form
				className="bg-white p-6 rounded-lg shadow-md max-w-xs md:max-w-md w-full"
				onSubmit={handleSubmit}>
				<div className="mb-3 flex flex-col gap-3">
					<label htmlFor="email" className="text-xl font-bold">
						Email
					</label>
					<input
						required
						value={loginPayload.email}
						name="email"
						onChange={onChange}
						type="text"
						className="py-4 px-4 focus:outline-none text-lg border-2 rounded-md border-purple-500 "
						placeholder="your@email.com"
					/>
				</div>
				<div className="mb-3 flex flex-col gap-3">
					<label htmlFor="password" className="text-xl font-bold">
						Password
					</label>
					<div className="flex relative items-center">
						<input
							required
							value={loginPayload.password}
							name="password"
							onChange={onChange}
							type={`${isShowPassword ? "text" : "password"}`}
							className="py-4 px-4 focus:outline-none text-lg border-2 rounded-md border-purple-500 w-full"
							placeholder="type your password"
						/>
						<div
							className="absolute right-5 cursor-pointer"
							onClick={() => setIsShowPassword(!isShowPassword)}>
							{isShowPassword ? (
								<EyeSlashIcon className="h-6 w-6 text-gray-400" />
							) : (
								<EyeIcon className="h-6 w-6 text-gray-400" />
							)}
						</div>
					</div>
				</div>
				<button
					type="submit"
					disabled={isLoading}
					aria-label="submit login"
					className={`${
						isLoading
							? "cursor-not-allowed bg-purple-400"
							: "cursor-pointer bg-purple-500"
					}   transition-all p-3 rounded-md font-semibold text-lg text-white w-full`}>
					{isLoading ? "Proccssing Your Login" : "Sign In"}
				</button>
				{error && <div className="text-md mt-3 text-red-500">{error}</div>}
			</form>
		</div>
	);
};

export default Home;
