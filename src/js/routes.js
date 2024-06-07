import PageTabs from "../components/App/PageTabs.jsx";
import Deals from "../pages/Deals.jsx";
import Favourite from "../pages/Favourite.jsx";
import Successful from "../pages/Successful.jsx";
import Reciept from "../pages/Reciept.jsx";
import Dealer from "../pages/Dealer.jsx";
import Notification from "../pages/Notification.jsx";
import Post from "../pages/Post.jsx";
import Terms from "../pages/Terms.jsx";
import Offers from "../pages/Offers.jsx";
import Car from "../pages/Car.jsx";
import Comments from "../pages/Comments.jsx";
import Profile from "../pages/Profile.jsx";
import Chat from "../pages/Chat.jsx";
import Name from "../pages/Profile/Name.jsx";
import Email from "../pages/Profile/Email.jsx";
import Phone from "../pages/Profile/Phone.jsx";
import Loader from "../pages/Loader.jsx";
import Transactions from "../pages/Transactions.jsx";
import AddCard from "../pages/AddCard.jsx";

var routes = [
  {
    path: "/",
    component: Loader,
  },

  {
    path: "/home",
    component: PageTabs,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/add_card",
    component: AddCard,
  },
  {
    path: "/profile/name",
    component: Name,
  },
  {
    path: "/profile/email",
    component: Email,
  },
  {
    path: "/profile/phone",
    component: Phone,
  },
  {
    path: "/deals",
    component: Deals,
  },
  {
    path: "/dealer/:id",
    component: Dealer,
  },
  {
    path: "/favourite",
    component: Favourite,
  },
  {
    path: "/successful/:id",
    component: Successful,
  },
  {
    path: "/reciept/:id",
    component: Reciept,
  },
  {
    path: "/notifications",
    component: Notification,
  },
  {
    path: "/post",
    component: Post,
  },
  {
    path: "/terms",
    component: Terms,
  },
  {
    path: "/chat/:id",
    component: Chat,
  },
  {
    path: "/comments",
    component: Comments,
  },
  {
    path: "/deals/:search",
    component: Deals,
  },
  {
    path: "/cars/:id",
    component: Car,
  },
  {
    path: "/offers",
    component: Offers,
  },
];

export default routes;
