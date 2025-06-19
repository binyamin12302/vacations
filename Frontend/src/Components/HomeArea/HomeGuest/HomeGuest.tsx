import "./HomeGuest.css";
import pic1 from "../../../assets/images/pic/pic-1.jpg";
import pic2 from "../../../assets/images/pic/pic-2.jpg";
import pic3 from "../../../assets/images/pic/pic-3.jpg";
import pic4 from "../../../assets/images/pic/pic-4.jpg";
import pic5 from "../../../assets/images/pic/pic-5.jpg";
import pic6 from "../../../assets/images/pic/pic-6.jpg";
import pic7 from "../../../assets/images/pic/pic-7.jpg";
import pic8 from "../../../assets/images/pic/pic-8.jpg";
import { useNavigate } from "react-router-dom";

function HomeGuest(): JSX.Element {
  const navigate = useNavigate();

  const vacationCards = [
    {
      title: "Coliseum",
      description:
        "Known as the Flavian Amphitheatre, the Roman Colosseum is one of the capital's most remarkable monuments. Every year over 6 million people visit it.",
      image: pic1,
    },
    {
      title: "Rio de Janeiro",
      description:
        "It is located on the Atlantic Ocean and is one of the world’s most beautiful urban centres.",
      image: pic2,
    },
    {
      title: "Palace of Versailles",
      description:
        "A former royal residence built by King Louis XIV located west of Paris, France.",
      image: pic3,
    },
    {
      title: "Egyptian pyramids",
      description:
        "The pyramids continue to inspire wonder in tourists, mathematicians, and archeologists.",
      image: pic4,
    },
    {
      title: "Victoria Falls",
      description:
        "Located between Zambia and Zimbabwe, it's one of the world's largest waterfalls.",
      image: pic5,
    },
    {
      title: "Great Wall of China",
      description:
        "Fortifications across ancient northern China built for protection.",
      image: pic6,
    },
    {
      title: "Taj Mahal",
      description:
        "A mausoleum complex in India, finest example of Mughal architecture.",
      image: pic7,
    },
    {
      title: "Stonehenge",
      description:
        "Ranks among the world's most iconic archaeological sites and enigmas.",
      image: pic8,
    },
  ];

  return (
    <div className="HomeGuest">
      <div className="container mt-3 bg-overlay">
        <div className="row p-5 text-center">
          <h1>Plan Your Vacation</h1>
          <br />
          <h3 className="text-muted">
            Get an account today, follow your planned vacations.
          </h3>
          <h3 className="text-muted">Enjoy and share with your friends.</h3>
          <br /> <br /> <br />
          <div className="d-flex justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-primary shadow-none responsive-button"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      <section id="packages" className="secPad">
        <div className="container">
          <div className="heading text-center">
            <h2>Most Popular Vacations</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>

          <div className="vacation-grid">
            {vacationCards.map((v, index) => (
              <div
                className="cuadro_intro_hover"
                key={index}
                style={{ backgroundColor: "#cccccc" }}
              >
                <p style={{ textAlign: "center" }}>
                  <img src={v.image} className="img-responsive" alt={v.title} />
                </p>
                <div className="caption">
                  <div className="blur"></div>
                  <div className="caption-text">
                    <h3>{v.title}</h3>
                    <p>{v.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeGuest;
