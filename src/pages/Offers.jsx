import PageLayout from "../components/App/PageLayout";
import SpecialOffer from "../components/home/SpecialOffer";
import { banners } from "../data";

const Offers = ({ f7router }) => {
	return (
		<PageLayout title={"Special Offers"} f7router={f7router}>
			<div className="flex flex-col gap-4 p-4 ">
				{banners.map((image, i) => (
					<SpecialOffer image={image} i={i} key={i} />
				))}
			</div>
		</PageLayout>
	);
};

export default Offers;
