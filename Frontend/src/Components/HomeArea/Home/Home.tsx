import { useEffect, useState } from "react";
import { Button, Container, Modal, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import FollowModel from "../../../Models/FollowModel";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import { fetchVacationsAction } from "../../../Redux/VacationsState";
import authService from "../../../Services/AuthService";
import socketService from "../../../Services/SocketService";
import vacationsService from "../../../Services/VacationsService";
import Pagination from "../../SharedArea/Pagination/Pagination";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import VacationCard from "../../VacationsArea/VacationCard/VacationCard";
import "./Home.css";

function Home(): JSX.Element {
  const [vacations, setVacation] = useState<VacationModel[]>([]);
  const [showModalAddVacation, setModalAddVacation] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [vacationsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCloseModalAddVacation = () => setModalAddVacation(false);
  const handleShowModalAddVacation = () => setModalAddVacation(true);

  useEffect(() => {
    socketService.connect();

    const unsubscribe = store.subscribe(() => {
      const dup = [...store.getState().vacationsState.vacations];
      setVacation(dup);
    });

    if (store.getState().vacationsState.vacations.length === 0) {
      setLoading(true);
      vacationsService
        .getAllVacations()
        .then((vacationList) => {
          store.dispatch(fetchVacationsAction(vacationList));
        })
        .catch((err) => console.log(err.message))
        .finally(() => setLoading(false));
    } else {
      const dup = [...store.getState().vacationsState.vacations];
      setVacation(dup);
      setLoading(false);
    }

    return () => {
      unsubscribe();
      store.dispatch(fetchVacationsAction([]));
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  async function handleFollowVacation(
    follow: FollowModel,
    isFollowing: string
  ) {
    try {
      const index = vacations.findIndex((v) => v.id === follow.vacationId);
      const vacation = vacations[index];
      if (isFollowing === "Unfollow") {
        await authService.unfollowVacation(follow);
        vacation.followState = "Follow";
      } else {
        await authService.followVacation(follow);
        vacation.followState = "Unfollow";
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  function handleVacationAdded(newVacation: VacationModel) {
  setVacation(prevVacations => [newVacation, ...prevVacations]);
  setCurrentPage(1); // מחזיר לעמוד הראשון
}


  const filteredVacations = vacations.filter(
    (vacation) =>
      vacation.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacation.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = filteredVacations.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );

  const cardsToShow =
    loading && vacations.length === 0
      ? Array(vacationsPerPage).fill(null)
      : currentVacations;

  return (
    <Container className="Home p-2">
      <div className="admin-actions-wrapper">
        {authService.isUserAdmin() && (
          <>
            <div className="admin-actions-btns">
              <Button
                variant="light"
                className="border btn-vac border-secondary shadow-none"
                onClick={handleShowModalAddVacation}
              >
                Add Vacation
              </Button>
              <NavLink
                className="btn btn-secondary text-white shadow-none"
                to="/chart"
              >
                Go to the Chart
              </NavLink>
            </div>
            <Modal
              show={showModalAddVacation}
              onHide={handleCloseModalAddVacation}
            >
              <AddVacation
                showModalAddVacation={setModalAddVacation}
                onVacationAdded={handleVacationAdded}
              />
            </Modal>
            <div className="admin-divider"></div>
          </>
        )}

        <div className="d-flex justify-content-center my-3">
          <div className="search-box position-relative">
            <span className="search-icon position-absolute top-50 start-0 translate-middle-y ps-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="#adb5bd"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.442 1.398a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
              </svg>
            </span>

            <input
              type="text"
              className="form-control search-input ps-5"
              placeholder="Search vacations..."
              style={{ width: "100%" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      <Row xs={1} sm={1} md={2} lg={3} xl={5} className="g-4 m-auto">
        {cardsToShow.map((v, i) => (
          <VacationCard
            key={v ? v.id : i}
            vacation={v || {}}
            handleFollow={handleFollowVacation}
            loading={loading && vacations.length === 0}
          />
        ))}
      </Row>

      {!loading && filteredVacations.length === 0 && (
        <div className="text-center my-5">
          <div className="display-6 text-muted mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#adb5bd"
              className="bi bi-search mb-2"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.442 1.398a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
            </svg>
            <div>No results found.</div>
          </div>
          <div className="text-muted">Try a different search.</div>
        </div>
      )}

      {filteredVacations.length > 0 && (
        <Pagination
          vacationsPerPage={vacationsPerPage}
          totalVacations={filteredVacations.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </Container>
  );
}

export default Home;
