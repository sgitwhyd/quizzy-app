import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getFromLocalStorage } from "../utils";

type ProtectedRouteProps = {
	children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const navigate = useNavigate();
	const isLogged = !!getFromLocalStorage("token");

	useEffect(() => {
		if (!isLogged) {
			navigate("/");
		}
	}, [isLogged, navigate]);

	return <>{children}</>;
};

export default ProtectedRoute;
