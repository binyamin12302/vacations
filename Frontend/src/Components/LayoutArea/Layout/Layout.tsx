import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";

import "./Layout.css";
import notifyService from "../../../Services/NotifyService";

function Layout(): JSX.Element {
  useEffect(() => {
    const message = localStorage.getItem("sessionMessage");
    if (message) {
      notifyService.error(message);
      localStorage.removeItem("sessionMessage");
    }
  }, []);

  return (
    <div className="Layout ">
      <header>
        <Header />
      </header>

      <main>
        <Routing />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
