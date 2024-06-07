import { useContext, useEffect, useState } from "react";
import PageLayout from "../components/App/PageLayout";
import { Form } from "react-bootstrap";

import { Stack, Avatar } from "@mui/material";
import axios from "axios";
import { URL } from "../data";
import { CarContext } from "../components/context/CarContext";
import login from "../assets/login.svg";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const years = [
  2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
];

const locations = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];
const brands = [
  "chrysler",
  "honda",
  "Mercedes",
  "ram",
  "Ford",
  "gmc",
  "audi",
  "subaru",
  "rolls-royce",
  "porsche",
  "BMW",
  "volvo",
  "lincoln",
  "maserati",
  "acura",
  "mclaren",
  "infiniti",
  "fiat",
  "scion",
  "dodge",
  "bentley",
  "aston-martin",
  "chevrolet",
  "land-rover",
  "mitsubishi",
  "Volkswagen",
  "Toyota",
  "jeep",
  "hyundai",
  "cadillac",
  "lamborghini",
  "Lexus",
  "alfa-romeo",
  "mini",
  "kia",
  "ferrari",
  "mazda",
  "nissan",
  "buick",
  "jaguar",
];

const carTypes = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Minivan",
  "Pickup Truck",
  "Crossover",
  "Wagon",
  "Electric Vehicle (EV)",
  "Hybrid",
  "Luxury Car",
  "Sports Car",
  "Compact Car",
  "Off-road Vehicle",
  "Truck",
  "Van",
  "Station Wagon",
  "Muscle Car",
  "Supercar",
];

const Post = ({ f7router }) => {
  const {
    setAuthOpen,
    auth,
    type,
    car,
    setCarUpdate,
    setType,
    update,
    setUpdate,
    setImageUpdate,
    imageUpdate,
  } = useContext(CarContext);
  const [uploadData, setUploadData] = useState({
    name: "",
    price: "",
    negotiable: "",
    description: "",
    year: "",
    location: "",
    stock: "",
    milage: "",
    brand: "",
    carStatus: "",
    transmission: "",
    carCondition: "",
    carColour: "",
    carType: "",
    carRegistered: "",
  });
  const [imagesPreview, setImagesPreview] = useState();
  const [images, setImages] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (type === "update") {
      setUploadData({
        name: car?.name,
        price: car?.price,
        negotiable: car?.negotiable,
        description: car?.description,
        year: car?.year,
        location: car?.location,
        stock: car?.stock,
        milage: car?.milage,
        brand: car?.brand,
        carStatus: car?.carStatus,
        transmission: car?.transmission,
        carColour: car?.carColour,
        carType: car?.carType,
        carRegistered: car?.carRegistered,
      });
      setImages(car?.images);
      setImagesPreview(car?.images);
    }
    return () => {
      setType("upload");
      setCarUpdate({});
    };
  }, [type]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
          if (type === "update") {
            setImageUpdate((oldArray) => [...oldArray, reader.result]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUploadData((prev) => {
      return { ...prev, [name]: value };
    });
    if (type === "update") {
      setUpdate((prev) => {
        return { ...prev, [name]: value };
      });
    }
    console.log(uploadData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${URL}/admin/createProduct`,
        { ...uploadData, images },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      setUploadData({
        name: "",
        price: "",
        negotiable: "",
        description: "",
        year: "",
        location: "",
        stock: "",
        milage: "",
        brand: "",
        carStatus: "",
      });
      setImages();
      setImagesPreview();
      f7router.navigate(`/cars/${data?.newProduct?._id}`);
      toast.success("Car Uploaded", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleClick = () => {
    const el = document.getElementById("car_images");
    if (el) {
      el.click();
    }
  };
  const [loadingp, setLoadingp] = useState(false);
  const handleUpdate = async (data, img, _id) => {
    let uploadObj;
    if (img.length > 0) {
      uploadObj = { ...data, images: img };
    } else {
      uploadObj = data;
    }
    if (!uploadObj) {
      toast.error("No Change to upload", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    try {
      setLoadingp(true);
      const { data } = await axios.put(
        `${URL}/admin/product/${_id}`,
        uploadObj,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      setLoadingp(false);
      console.log(data);
      if (data?.success) {
        toast.success("update Successful", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        f7router.navigate(`/cars/${data?.update?._id}`);
      }
      //   setScrollShow(false);
    } catch (error) {
      console.log(error);
      setLoadingp(false);
    }
  };

  if (!auth) {
    return (
      <PageLayout title={"Notifications"} f7router={f7router}>
        <div className="px-4">
          <div
            style={{
              height: "70vh",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img src={login} alt="no-favourite" />
            <p
              style={{
                paddingTop: "55px",
                fontWeight: "800",
                fontSize: "20px",
              }}
            >
              You are not authenticated{" "}
            </p>
            <button
              onClick={() => setAuthOpen(true)}
              style={{
                marginTop: "55px",
                border: "none",
                borderRadius: "5px",
                background: "#109324",
                width: "214.11px",
                height: "33.84px",
                color: "white",
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={"Post Advert"} f7router={f7router} type="type2">
      <ul
        className="p-4 flex flex-col gap-4"
        style={{
          // background: "#EEF7F0",
          borderTopRightRadius: "10px",
          borderTopLeftRadius: "10px",
          borderTop: "1px solid #f4f0f0",
        }}
      >
        <div className="grid grid-cols-1 gap-5 w-full cool_height">
          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">First Name</label> */}
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={uploadData.name}
              required={true}
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
              }}
              placeholder="Car Name"
              className="py-2 px-4 w-full rounded border cool_item_height"
              // value={user.lastName}
              // onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p style={{ fontSize: "16px" }}>Images</p>
            <div
              onClick={() => handleClick()}
              style={{
                width: "100px",
                height: "100px",
                background: "green",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddIcon
                sx={{ color: "white", fontSize: "50px", fontWeight: "800" }}
              />
              <input
                id="car_images"
                style={{ display: "none" }}
                type="file"
                multiple
                onChange={handleImageChange}
              />
            </div>
            {imagesPreview && type !== "update" && (
              <Stack
                spacing={2}
                direction="row"
                sx={{ margin: "10px", display: "flex", flexWrap: "wrap" }}
              >
                {imagesPreview.map((img, index) => {
                  return (
                    <Avatar
                      key={index}
                      src={img}
                      alt="img upload"
                      sx={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "5px",
                      }}
                    />
                  );
                })}
              </Stack>
            )}
            {imagesPreview && type === "update" && (
              <Stack
                spacing={2}
                direction="row"
                sx={{ margin: "10px", display: "flex", flexWrap: "wrap" }}
              >
                {imagesPreview.map((img, index) => {
                  return (
                    <Avatar
                      key={index}
                      src={img?.url || img}
                      alt="img upload"
                      sx={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "5px",
                      }}
                    />
                  );
                })}
              </Stack>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <input
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
              }}
              className="py-2 px-4 w-full rounded border cool_item_height"
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              value={uploadData.price}
              required={true}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <Form.Group
              className="mb-3"
              controlId="username"
              style={{ width: "100%" }}
            >
              <Form.Label>
                Is Price Negotiable?{" "}
                {uploadData?.negotiable ? (
                  <>
                    {type === "update" && (
                      <span style={{ color: "green" }}>Yes</span>
                    )}{" "}
                  </>
                ) : (
                  <>
                    {type === "update" && (
                      <span style={{ color: "red" }}>No</span>
                    )}{" "}
                  </>
                )}
              </Form.Label>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value={true}
                  name="negotiable"
                  onChange={handleChange}
                  control={<Radio />}
                  label="YES"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="NO"
                  name="negotiable"
                  onChange={handleChange}
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </Form.Group>
          </div>
          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <input
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
              }}
              className="py-2 px-4 w-full rounded border cool_item_height"
              type="text"
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={uploadData.description}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <input
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
              }}
              className="py-2 px-4 w-full rounded border cool_item_height"
              type="number"
              name="stock"
              placeholder="Enter stock"
              onChange={handleChange}
              value={uploadData.stock}
              required=""
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <input
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
              }}
              className="py-2 px-4 w-full rounded border cool_item_height"
              type="number"
              name="milage"
              placeholder="Millage"
              onChange={handleChange}
              value={uploadData.milage}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <select
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
                color: "gray",
              }}
              //   placeholder="Region"
              className="py-2 px-4 w-full rounded border cool_item_height"
              id="demo-simple-select"
              value={uploadData.brand}
              label="brand"
              name="brand"
              onChange={handleChange}
            >
              <option style={{ color: "gray" }}>Car Brand</option>
              {brands.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <select
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
                color: "gray",
              }}
              //   placeholder="Region"
              className="py-2 px-4 w-full rounded border cool_item_height"
              id="demo-simple-select"
              value={uploadData.carStatus}
              label="carStatus"
              name="carStatus"
              onChange={handleChange}
            >
              <option style={{ color: "gray" }}>Car Status</option>
              <option style={{ color: "gray" }} value="used">
                Used{" "}
              </option>
              <option style={{ color: "gray" }} value="new">
                Brand New{" "}
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <select
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
                color: "gray",
              }}
              //   placeholder="Region"
              className="py-2 px-4 w-full rounded border cool_item_height"
              id="demo-simple-select"
              value={uploadData.location}
              label="carLocation"
              name="location"
              onChange={handleChange}
            >
              <option style={{ color: "gray" }}>choose location</option>
              {locations.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <select
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
                color: "gray",
              }}
              //   placeholder="Region"
              className="py-2 px-4 w-full rounded border cool_item_height"
              id="demo-simple-select"
              value={uploadData.year}
              label="year"
              name="year"
              onChange={handleChange}
            >
              <option style={{ color: "gray" }}>Choose year</option>
              {years.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <select
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
                color: "gray",
              }}
              //   placeholder="Region"
              className="py-2 px-4 w-full rounded border cool_item_height"
              id="demo-simple-select"
              value={uploadData.transmission}
              label="transmission"
              name="transmission"
              onChange={handleChange}
            >
              <option>Choose Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <select
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
                color: "gray",
              }}
              //   placeholder="Region"
              className="py-2 px-4 w-full rounded border cool_item_height"
              id="demo-simple-select"
              value={uploadData.carCondition}
              label="carCondition"
              name="carCondition"
              onChange={handleChange}
            >
              <option>Choose Condition</option>
              <option value="Foreign Used">Foreign Used</option>
              <option value="Nigerian used">Nigerian used</option>
              <option value="Brand New">Brand New</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <input
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
              }}
              className="py-2 px-4 w-full rounded border cool_item_height"
              type="text"
              name="carColour"
              placeholder="Enter car colour"
              onChange={handleChange}
              value={uploadData.carColour}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <select
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
                color: "gray",
              }}
              //   placeholder="Region"
              className="py-2 px-4 w-full rounded border cool_item_height"
              id="demo-simple-select"
              value={uploadData.carType}
              label="carType"
              name="carType"
              onChange={handleChange}
            >
              <option>Car Types</option>
              {carTypes.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            {/* <label htmlFor="">Last Name</label> */}
            <select
              style={{
                border: "1px solid #d9d4d4",
                borderRadius: "5px",
                padding: "5px",
                height: "40px",
                color: "gray",
              }}
              //   placeholder="Region"
              className="py-2 px-4 w-full rounded border cool_item_height"
              id="demo-simple-select"
              value={uploadData.carRegistered}
              label="carRegistered"
              name="carRegistered"
              onChange={handleChange}
            >
              <option>Car Registered</option>
              <option value="Yes">Yes </option>
              <option value="No">No </option>
            </select>
          </div>
        </div>

        {!loading && type === "upload" && (
          <button
            onClick={handleSubmit}
            style={{
              height: "45px",
              borderRadius: "5px",
              color: "white",
              background: "#109324",
            }}
          >
            save
          </button>
        )}
        {!loading && !loadingp && type === "update" && (
          <button
            onClick={() => handleUpdate(update, imageUpdate, car?._id)}
            style={{
              height: "45px",
              borderRadius: "5px",
              color: "white",
              background: "#109324",
            }}
          >
            Update
          </button>
        )}
        {!loading && loadingp && type === "update" && (
          <button
            style={{
              height: "45px",
              borderRadius: "5px",
              color: "white",
              background: "#109324",
            }}
          >
            <CircularProgress sx={{ color: "white" }} size={20} />
          </button>
        )}
        {loading && (
          <button
            onClick={handleSubmit}
            style={{
              height: "45px",
              borderRadius: "5px",
              color: "white",
              background: "#109324",
            }}
          >
            <CircularProgress sx={{ color: "white" }} size={20} />
          </button>
        )}

        <p>
          By clicking on the post Ad, you accept the confirm that you will abide
          by the{" "}
          <span
            onClick={() => f7router.navigate("/terms")}
            style={{ color: "#109324" }}
          >
            safety Tips
          </span>
          , and declare that this posting does not include any prohibited items.
        </p>
      </ul>
      {/* <DeliveryModal
        handleClose={handleClose}
        open={open}
        notification={selectedNotification}
      /> */}
      <ToastContainer />
    </PageLayout>
  );
};

export default Post;
