import { createBrowserRouter } from "react-router-dom";
import Quiz from "./pages/quiz";
import Home from "./pages/Home";
import Result from "./pages/Result";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/quiz",
		element: (
			<ProtectedRoute>
				<Quiz />
			</ProtectedRoute>
		),
	},
	{
		path: "/quiz/result",
		element: (
			<ProtectedRoute>
				<Result />
			</ProtectedRoute>
		),
	},
]);

export default router;
