import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { Bar } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import vacationsService from "../../../Services/VacationsService";
import { fetchVacationsAction } from "../../../Redux/VacationsState";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (store.getState().vacationsState.vacations.length === 0) {
      setLoading(true);
      vacationsService
        .getAllVacations()
        .then((vacations) => {
          store.dispatch(fetchVacationsAction(vacations));
        })
        .finally(() => setLoading(false));
    }

    setVacations(store.getState().vacationsState.vacations);

    const unsubscribe = store.subscribe(() => {
      setVacations([...store.getState().vacationsState.vacations]);
    });
    return unsubscribe;
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const followedVacations = vacations.filter((v) => v.followers > 0);

  const labels = followedVacations.map((v) => v.destination);

  const data = {
    labels,
    datasets: [
      {
        label: "Followers",
        data: followedVacations.map((v) => v.followers),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  if (loading) {
    return (
      <Container className="Chart">
        <div className="text-center m-5">
          <Spinner animation="border" />
          <div>Loading data...</div>
        </div>
      </Container>
    );
  }

  if (!followedVacations.length) {
    return (
      <Container className="Chart">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "70vh" }}
        >
          <div
            className="mb-4 p-4 rounded-3 shadow-sm border"
            style={{ background: "#f8f9fa", maxWidth: 400 }}
          >
            <div className="display-6 mb-2" style={{ color: "#6c757d" }}>
              <i className="bi bi-bar-chart-fill me-2" />
              Vacations Chart
            </div>
            <div className="fs-5 mb-3 text-muted">
              No vacations with followers to display.
            </div>
            <NavLink
              className="btn btn-secondary w-100 d-flex align-items-center justify-content-center"
              to="/"
              style={{ fontSize: "1.1rem" }}
            >
              <ArrowLeft className="me-2" size={20} />
              Back to Home
            </NavLink>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="Chart ">
      <div className="m-4 adm text-center">
        <NavLink className="btn btn-secondary text-white shadow-none" to="/">
          Back to Home
        </NavLink>
      </div>
      <Bar options={options} data={data} />
    </Container>
  );
}

export default Chart;
