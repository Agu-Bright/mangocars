import { HeartIcon } from "@heroicons/react/20/solid";
// import { Link } from "framework7-react";
import { moneyFormat } from "../../functions";
import { Rating, Stack, Skeleton } from "@mui/material";

const CarCard = ({ i, car, f7router, loading }) => {
  if (loading) {
    return (
      <>
        <Stack
          spacing={1}
          sx={{ border: "1px solid #d1d3d8", borderRadius: "10px" }}
        >
          <Skeleton variant="rectangle" height={150} />
          <Stack spacing={0.5} sx={{ paddingBottom: "5px" }}>
            <Skeleton
              variant="rectangle"
              height={15}
              width="80%"
              sx={{ borderRadius: "5px" }}
            />
            <Skeleton
              variant="rectangle"
              height={15}
              width="70%"
              sx={{ borderRadius: "5px" }}
            />
            <Skeleton
              variant="rectangle"
              height={15}
              width="60%"
              sx={{ borderRadius: "5px" }}
            />
          </Stack>
        </Stack>
      </>
    );
  }
  // const { images, name, price, rating, carStatus } = car;
  return (
    <button
      onClick={() => f7router.navigate("/cars/" + i)}
      className="flex flex-col  w-full relative h-full m-0 p-0"
    >
      <div className="relative">
        <button className="absolute top-1 right-1 bg-zinc-500/50 text-zinc-50 p-2 rounded-full w-max h-max ">
          <HeartIcon className="h-4" />
        </button>
        <img
          src={car?.images[0]?.url}
          className="aspect-[7/5] rounded"
          alt={car?.images[0]?.public_id}
        />
      </div>
      <div className="pt-2 flex flex-col h-full w-full">
        <div className="flex justify-between w-full gap-2">
          <h4 className="font-semibold text-start">{car?.name}</h4>
          <div className="bg-zinc-200 rounded px-2 py-1 h-max w-max">
            {car?.carStatus}
          </div>
        </div>
        <div className="flex justify-between mt-1 items-end h-full">
          <p className="">{moneyFormat(car?.price)}</p>
          <div className="flex-col text-right text-xs">
            {car?.rating}/5
            <div className="flex">
              <Rating name="read-only" value={car?.rating} readOnly />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CarCard;
