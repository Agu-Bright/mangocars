import { Page, Tabs } from "framework7-react";
import Home from "../../pages/Home";
import BottomNav from "./BottomNav";
import Payment from "../../pages/Payment";
import Orders from "../../pages/Orders";
import Inbox from "../../pages/Inbox";

const PageTabs = ({ f7router }) => {
  return (
    <Page pageContent={false} className="bg-zinc-50">
      {/* pages */}
      <Tabs>
        <Home f7router={f7router} />
        <Payment f7router={f7router} />
        <Orders f7router={f7router} />
        <Inbox f7router={f7router} />
        <BottomNav f7router={f7router} />
      </Tabs>
    </Page>
  );
};

export default PageTabs;
