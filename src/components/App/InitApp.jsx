import { App, Page, View } from "framework7-react";

const InitApp = ({ f7params }) => {
	return (
		<App
			colorTheme="red"
			className="h-full"
			{...f7params}
		>
			<Page>
				{/* Your main view, should have "view-main" class */}
				{/* bottom nav */}
				<View main className="safe-areas" url="/" />
			</Page>
		</App>
	);
};

export default InitApp;
