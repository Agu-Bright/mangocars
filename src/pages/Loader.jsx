import { Page, Preloader } from "framework7-react";
import { logo } from "../assets";
import { useEffect } from "react";

const Loader = ({ f7router }) => {
	useEffect(() => {
		setTimeout(() => {
			f7router.navigate("/home", {
				transition: "f7-dive",
				clearPreviousHistory: true,
			});
		}, 3000);
	}, []);
	return (
		<Page className="">
			<div className="h-full w-full flex flex-col relative justify-center items-center gap-4">
				<img src={logo} className="w-3/4" alt="" />
				<div className="flex flex-col items-center gap-2">
					<h2>Loading</h2>
					<Preloader size={20} />
				</div>
				<p className="absolute bottom-0 left-0 w-full p-4 text-center">
					Your No 1 Marketplace where we buy, sell and swap only quality cars
				</p>
			</div>
		</Page>
	);
};

export default Loader;
