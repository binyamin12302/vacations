import { Card } from "react-bootstrap";
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

    return (
        <div className="HomeGuest">
            <div className="container mt-3 bg-overlay">
                <div className="row p-5 text-center">
                    <h1 >Plan Your Vacation</h1>
                    <br />
                    <h3 className="text-muted">Get an account today, follow your planned vacations.</h3>
                    <h3 className="text-muted">Enjoy and share with your friends.</h3>
                    <br />  <br />  <br />
                    <button type="button" className="btn btn-primary w-25 d-block m-auto  shadow-none" onClick={() => { navigate("/register") }}>Register</button>
                </div>
            </div>


            <section id="packages" className="secPad">
                <div className="container">
                    <div className="heading text-center">
                        {/* <!-- Heading --> */}
                        <h2>Most Popular Vacations</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div className="cuadro_intro_hover " style={{ backgroundColor: "#cccccc" }}>
                                <p style={{ textAlign: "center" }}>
                                    <Card.Img src={pic1} className="img-responsive" alt="pic1" />
                                </p>
                                <div className="caption">
                                    <div className="blur"></div>
                                    <div className="caption-text">
                                        <h3>Coliseum</h3>
                                        <p>Known as the Flavian Amphitheatre,
                                            the Roman Colosseum is one of the capital's most remarkable monuments.
                                            Every year over 6 million people visit it.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="cuadro_intro_hover " style={{ backgroundColor: "#cccccc" }}>
                                <p style={{ textAlign: "center" }}>
                                    <img src={pic2} className="img-responsive" alt="pic2" />
                                </p>
                                <div className="caption">
                                    <div className="blur"></div>
                                    <div className="caption-text">
                                        <h3>Rio de Janeiro</h3>
                                        <p>It is located on the Atlantic Ocean, in the southeastern part of the tropical zone of South America,
                                            and is widely recognized as one of the world’s most beautiful and interesting urban centres.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="cuadro_intro_hover " style={{ backgroundColor: "#cccccc" }}>
                                <p style={{ textAlign: "center" }}>
                                    <img src={pic3} className="img-responsive" alt="pic3" />
                                </p>
                                <div className="caption">
                                    <div className="blur"></div>
                                    <div className="caption-text">
                                        <h3>Palace of Versailles</h3>
                                        <p>The Palace of Versailles is a former royal residence built by King Louis XIV located in Versailles,
                                            about 12 miles (19 km) west of Paris, France.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="cuadro_intro_hover " style={{ backgroundColor: "#cccccc" }}>
                                <p style={{ textAlign: "center" }}>
                                    <img src={pic4} className="img-responsive" alt="pic4" />
                                </p>
                                <div className="caption">
                                    <div className="blur"></div>
                                    <div className="caption-text">
                                        <h3>Egyptian pyramids</h3>
                                        <p>The pyramids of Egypt fascinated travellers and conquerors in ancient times
                                            and continue to inspire wonder in the tourists,
                                            mathematicians, and archeologists who visit, explore, measure, and describe them.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div className="cuadro_intro_hover " style={{ backgroundColor: "#cccccc" }}>
                                <p style={{ textAlign: "center" }}>
                                    <img src={pic5} className="img-responsive" alt="pic5" />
                                </p>
                                <div className="caption">
                                    <div className="blur"></div>
                                    <div className="caption-text">
                                        <h3>Victoria Falls</h3>
                                        <p>Victoria Falls  is a waterfall on the Zambezi River in southern Africa,
                                            which provides habitat for several unique species of plants and animals.
                                            It is located on the border between Zambia and Zimbabwe and is one of the world's largest waterfalls. </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-3  col-sm-6">
                            <div className="cuadro_intro_hover" style={{ backgroundColor: "#cccccc" }}>
                                <p style={{ textAlign: "center" }}>
                                    <img src={pic6} className="img-responsive" alt="pic6" />
                                </p>
                                <div className="caption">
                                    <div className="blur"></div>
                                    <div className="caption-text">
                                        <h3>Great Wall of China</h3>
                                        <p>The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states
                                            and Imperial China as protection against various nomadic groups from the Eurasian Steppe. </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-3  col-sm-6">
                            <div className="cuadro_intro_hover " style={{ backgroundColor: "#cccccc" }}>
                                <p style={{ textAlign: "center" }}>
                                    <img src={pic7} className="img-responsive" alt="pic7" />
                                </p>
                                <div className="caption">
                                    <div className="blur"></div>
                                    <div className="caption-text">
                                        <h3>Taj Mahal</h3>
                                        <p>The Taj Mahal is a mausoleum complex in Agra, western Uttar Pradesh state, northern India.
                                            It is considered the finest example of Mughal architecture (a blend of Indian, Persian, and Islamic styles). </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-3  col-sm-6">
                            <div className="cuadro_intro_hover " style={{ backgroundColor: "#cccccc" }}>
                                <p style={{ textAlign: "center" }}>
                                    <img src={pic8} className="img-responsive" alt="pic8" />
                                </p>
                                <div className="caption">
                                    <div className="blur"></div>
                                    <div className="caption-text">
                                        <h3>Stonehenge</h3>
                                        <p>Stonehenge in southern England ranks among the world's most
                                            iconic archaeological sites and one of its greatest enigmas.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default HomeGuest;
