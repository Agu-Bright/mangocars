import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useContext, useState } from "react";
import PageLayout from "../components/App/PageLayout";
import CarsList from "../components/home/CarsList";
import SearchBar from "../components/home/SearchBar";
import { CarContext } from "../components/context/CarContext";
import { Pagination, Stack } from "@mui/material";
import axios from "axios";
import { URL } from "../data";

const Dealer = ({ f7router, f7route }) => {
  const { id } = f7route.params;
  console.log(id);

  const [DealersPost, setDealersPost] = useState();
  const [loading, setLoading] = useState(false);
  const [dealer, setDealer] = useState();
  useEffect(() => {
    id &&
      (async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`${URL}/products?user=${id}`);
          console.log(data);
          setLoading(false);
          setDealer(data?.products[0]?.user?.name);
          setDealersPost({ products: data?.products });
        } catch (error) {
          setLoading(false);

          console.log(error);
        }
      })();
  }, [id]);

  return (
    <PageLayout title={`Dealer: ${dealer}`} f7router={f7router}>
      <div className="px-4">
        <CarsList
          type="favourite"
          f7router={f7router}
          topDeals={DealersPost}
          loading={loading}
        />
        {/* 
        <Stack sx={{ alignItems: "center", color: "green" }} mt={2}>
          <Pagination
            count={topDeals?.numberOfPages}
            variant="outlined"
            onChange={handleChange}
            sx={{ color: "green" }}
          />
        </Stack> */}

        {/* {page && !brand && !valueS && (
          <Stack sx={{ alignItems: "center", color: "green" }} mt={2}>
            <Pagination
              count={topDeals?.numberOfPages}
              variant="outlined"
              onChange={handleChange}
              sx={{ color: "green" }}
            />
          </Stack>
        )} */}
        {/* {(brand || valueS) && (
          <Stack sx={{ alignItems: "center", color: "green" }} mt={2}>
            <Pagination
              count={topDeals?.searchNumberOfPages}
              variant="outlined"
              onChange={handleChange}
              sx={{ color: "green" }}
            />
          </Stack>
        )} */}
      </div>
    </PageLayout>
  );
};

export default Dealer;
