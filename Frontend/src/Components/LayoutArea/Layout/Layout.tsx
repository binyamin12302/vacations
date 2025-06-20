import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "../../SharedArea/Navigator/Navigator";

function Layout(): JSX.Element {


  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

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
