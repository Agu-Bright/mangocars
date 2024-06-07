import { f7, f7ready } from "framework7-react";
import { getDevice } from "framework7/lite-bundle";
// import { KonstaProvider } from "konsta/react";
import capacitorApp from "../../js/capacitor-app";
import routes from "../../js/routes";
import store from "../../js/store";
import InitApp from "./InitApp";
import CarContextProvider from "../context/CarContext";

const MyApp = () => {
  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: "podio", // App name
    theme: "auto", // Automatic theme detection
    dark: false,

    // App store
    store: store,
    // App routes
    routes: routes,

    // Input settings
    input: {
      scrollIntoViewOnFocus: device.capacitor,
      scrollIntoViewCentered: device.capacitor,
    },
    // Capacitor Statusbar settings
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
  };

  f7ready(() => {
    // Init capacitor APIs (see capacitor-app.js)
    if (f7.device.capacitor) {
      capacitorApp.init(f7);
    }
    // Call F7 APIs here
  });

  return (
    <CarContextProvider>
      <InitApp f7params={f7params} />
    </CarContextProvider>
  );
};
export default MyApp;
