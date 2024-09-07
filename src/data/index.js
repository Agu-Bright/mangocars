import {
  SiAcura,
  SiAudi,
  SiBmw,
  SiMercedes,
  SiNissan,
  SiToyota,
} from "react-icons/si";
import {
  car1,
  car2,
  car3,
  car4,
  car5,
  car6,
  car7,
  car8,
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
} from "../assets";

export const popularBrands = [
  { title: "Toyota", icon: SiToyota },
  { title: "Lexus" },
  { title: "Mercedes", icon: SiMercedes },
  { title: "BMW", icon: SiBmw },
  { title: "Nissan", icon: SiNissan },
  { title: "Acura", icon: SiAcura },
  { title: "Audi", icon: SiAudi },
];
export const cars = [
  { title: "Toyota Highlander (2018)", price: 10000000, image: car1 },
  { title: "Range Rover Sport (2018)", price: 15000000, image: car2 },
  { title: "Lexus E5 350", price: 8000000, image: car3 },
  { title: "Mercedes Benz (2010)", price: 7500000, image: car4 },
  { title: "Toyota Highlander (2020)", price: 30000000, image: car5 },
  { title: "Lexus EX 350", price: 8000000, image: car6 },
  { title: "Mercedes ES 350 (2010)", price: 12000000, image: car7 },
  { title: "Toyota Camry (2018)", price: 11000000, image: car8 },
];
export const comments = [
  {
    user: "John Doe",
    body: "I love this dealership, they deliver all the time",
    replies: [
      {
        user: "Jane Doe",
        body: "Good dealership, they deliver all the time",
      },
    ],
  },
  {
    user: "Freddie Joe",
    body: "His cars are neat and works in perfect condition. You can patronize him. Very honest guy.",
  },
];
export const banners = [banner1, banner2, banner3, banner4, banner5, banner6];
export const URL = "http://localhost:4000/api/v1";
