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
import notifyService from "../../../Services/NotifyService";

function Home(): JSX.Element {
  const [vacations, setVacation] = useState<VacationModel[]>([]);
  const [showModalAddVacation, setModalAddVacation] = useState<boolean>(false);
  const [vacationsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Init from localStorage
  const getSortByFromStorage = () =>
    localStorage.getItem("vacation-sortBy") || "startDate-asc";
  const getCurrentPageFromStorage = () =>
    Number(localStorage.getItem("vacation-currentPage")) || 1;

  const [sortBy, setSortBy] = useState<string>(getSortByFromStorage());
  const [currentPage, setCurrentPage] = useState<number>(
    getCurrentPageFromStorage()
  );

  const handleCloseModalAddVacation = () => setModalAddVacation(false);
  const handleShowModalAddVacation = () => setModalAddVacation(true);

  // Persist sortBy
  useEffect(() => {
    localStorage.setItem("vacation-sortBy", sortBy);
  }, [sortBy]);

  // Persist currentPage
  useEffect(() => {
    localStorage.setItem("vacation-currentPage", String(currentPage));
  }, [currentPage]);

  // Fetch vacations & subscribe
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
        .catch((err) => {
          console.log(err.message);
          if (err?.response?.status !== 401 && err?.response?.status !== 403) {
            notifyService.error(
              "Failed to fetch vacations. Please try again later."
            );
          }
        })
        .finally(() => setLoading(false));
    } else {
      const dup = [...store.getState().vacationsState.vacations];
      setVacation(dup);
      setLoading(false);
    }

    return () => {
      unsubscribe();
      socketService.disconnect();
    };
  }, []);

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
      notifyService.error("Failed to follow/unfollow. Please try again.");
    }
  }

  function sortVacations(
    vacations: VacationModel[],
    sortBy: string
  ): VacationModel[] {
    const arr = [...vacations];
    switch (sortBy) {
      case "startDate-asc":
        return arr.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      case "startDate-desc":
        return arr.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      case "followers-desc":
        return arr.sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0));
      case "followers-asc":
        return arr.sort((a, b) => (a.followers ?? 0) - (b.followers ?? 0));
      case "price-asc":
        return arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case "price-desc":
        return arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      default:
        return arr;
    }
  }

  const filteredVacations = vacations.filter(
    (vacation) =>
      vacation.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacation.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedVacations = sortVacations(filteredVacations, sortBy);

  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = sortedVacations.slice(
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
                onVacationAdded={() => setCurrentPage(1)}
              />
            </Modal>
            <div className="admin-divider"></div>
          </>
        )}

        <div className="d-flex justify-content-center my-3 gap-2 flex-wrap ">
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
              aria-label="Search vacations"
              style={{ width: "100%" }}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              autoComplete="off"
            />
          </div>
          <div>
            <select
              className="form-select sort-dropdown mt-3 shadow-none"
              style={{ minWidth: 190, maxWidth: 220 }}
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1); // Reset to first page on sort change
              }}
            >
              <option value="startDate-asc">Date: Nearest first</option>
              <option value="startDate-desc">Date: Furthest first</option>
              <option value="followers-desc">Followers: Most first</option>
              <option value="followers-asc">Followers: Least first</option>
              <option value="price-asc">Price: Lowest first</option>
              <option value="price-desc">Price: Highest first</option>
            </select>
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
        <div className="d-flex justify-content-center">
          <div className="vacations-empty-state text-center">
            <div className="display-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#adb5bd"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.442 1.398a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
              </svg>
              <div>
                {searchTerm
                  ? "No results found. Try a different search."
                  : "No vacations available at the moment."}
              </div>
            </div>
            <div className="sub-message">
              {searchTerm
                ? "We couldn’t find any vacations matching your search."
                : "Add a new vacation or check back later."}
            </div>
          </div>
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
