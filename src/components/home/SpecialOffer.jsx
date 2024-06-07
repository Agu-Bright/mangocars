function SpecialOffer({ i, image }) {
	return (
		<div
			className={`${
				i % 2 == 0 ? "bg-primary" : "bg-secondary"
			} aspect-[2/1] grid grid-cols-2 text-white p-5 rounded-md w-full`}
		>
			<div className="flex flex-col justify-around gap-2">
				<h5 className="text-3xl font-bold">20% off</h5>
				<h6 className="text-lg font-semibold">Special Offers</h6>
				<p className="text-xs">
					Get a new car discount, <br /> only valid this week
				</p>
			</div>
			<div className="flex justify-center items-center">
				<img src={image} className="" alt="" />
			</div>
		</div>
	);
}

export default SpecialOffer;
