import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { CarContext } from "../context/CarContext";
function SearchBar({ f7router, value, setValue }) {
  const { clearFilter } = useContext(CarContext);
  console.log(f7router);
  return (
    <div className="px-4 w-full relative">
      <input
        onFocus={() => {
          if (f7router && f7router.url !== "/deals") {
            clearFilter();
          }
          if (f7router) f7router.navigate("/deals");
        }}
        className="bg-zinc-100 border-zinc-200 border-2 px-5 pl-10 py-3 w-full rounded-md"
        placeholder="Let's find..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="h-5 text-zinc-400 absolute top-3.5 left-7" />
    </div>
  );
}

export default SearchBar;
