import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link, Page, Popup } from "framework7-react";
import SearchBar from "./SearchBar";

const AllBrands = ({ showAllBrands, setShowAllBrands, allBrands }) => {
	return (
		<Popup
			opened={showAllBrands}
			onPopupClose={() => setShowAllBrands(false)}
			swipeToClose="to-bottom"
		>
			<Page>
				<nav className="relative py-4 bg-primary text-white text-lg font-bold text-center">
					<h2>All Cars</h2>
					<XMarkIcon
						onClick={() => setShowAllBrands(false)}
						className="h-6 absolute left-4 top-4.5"
					/>
				</nav>
				<div className="my-4">
					<SearchBar />
				</div>
				<ul className="flex flex-col font-medium">
					<li>
						<Link
							href="/deals"
							onClick={() => setShowAllBrands(false)}
							className="capitalize py-3 px-4 border-b border-b-zinc-300 block m-0"
						>
							Show all
							<span className="text-zinc-500 lowercase ml-4">400 ads</span>
						</Link>
					</li>
					{allBrands?.map((brand) => (
						<li key={brand.name}>
							<Link
								href={"/deals/" + brand.name}
								onClick={() => setShowAllBrands(false)}
								className="capitalize py-3 px-4 border-b border-b-zinc-300 block m-0"
							>
								{brand.name}
								<span className="text-zinc-500 lowercase ml-4">
									{brand.num_models} ads
								</span>
							</Link>
						</li>
					))}
				</ul>
			</Page>
		</Popup>
	);
};
export default AllBrands;
