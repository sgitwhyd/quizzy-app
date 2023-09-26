import React from "react";
import Navigation from "./Navigation";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Navigation />
			{children}
		</div>
	);
};

export default PageLayout;
