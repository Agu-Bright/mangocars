import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useContext } from "react";
import PageLayout from "../components/App/PageLayout";
import CarsList from "../components/home/CarsList";
import SearchBar from "../components/home/SearchBar";
import { CarContext } from "../components/context/CarContext";
import { Pagination, Stack } from "@mui/material";

const Deals = ({ f7router, f7route }) => {
  const {
    loading,
    topDeals,
    getAllCars,
    brand,
    valueS,
    setValue,
    page,
    setPage,
  } = useContext(CarContext);
  const { search } = f7route.params;

  useEffect(() => {
    if (search) {
      setValue(search);
    }
  }, [search]);

  const handleChange = (e, value) => {
    console.log(value);
    setPage(value);
  };

  useEffect(() => {
    (async () => {
      await getAllCars({
        page: page,
        searchQuery: valueS,
        brand: brand,
      });
    })();
  }, [page, valueS, location, brand]);

  return (
    <PageLayout title={"Top Deals"} f7router={f7router}>
      <div className="py-4">
        <SearchBar value={valueS} setValue={setValue} />
      </div>
      <div className="px-4">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">Best Deals</h2>
            <p className="text-zinc-400 font-medium text-xs">
              {`${
                brand || valueS
                  ? topDeals?.filteredProductCount
                  : topDeals?.productsCount
              }`}{" "}
              results
            </p>
          </div>
          <div className="relative">
            <select
              style={{
                border: "1px solid rgb(82 82 91)",
                borderRadius: ".25rem",
                padding: ".25rem 1rem",
                paddingRight: "2rem",
              }}
              className="border rounded py-1 px-2 border-zinc-600"
            >
              <option value="">Select</option>
            </select>
            <ChevronDownIcon className="h-4 absolute right-2 top-2" />
          </div>
        </div>
        <CarsList f7router={f7router} topDeals={topDeals} loading={loading} />
        {/* 
        <Stack sx={{ alignItems: "center", color: "green" }} mt={2}>
          <Pagination
            count={topDeals?.numberOfPages}
            variant="outlined"
            onChange={handleChange}
            sx={{ color: "green" }}
          />
        </Stack> */}

        {page && !brand && !valueS && (
          <Stack sx={{ alignItems: "center", color: "green" }} mt={2}>
            <Pagination
              count={topDeals?.numberOfPages}
              variant="outlined"
              onChange={handleChange}
              sx={{ color: "green" }}
            />
          </Stack>
        )}
        {(brand || valueS) && (
          <Stack sx={{ alignItems: "center", color: "green" }} mt={2}>
            <Pagination
              count={topDeals?.searchNumberOfPages}
              variant="outlined"
              onChange={handleChange}
              sx={{ color: "green" }}
            />
          </Stack>
        )}
      </div>
    </PageLayout>
  );
};

export default Deals;
