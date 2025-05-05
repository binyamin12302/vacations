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

  const handleCloseModalAddVacation = () => setModalAddVacation(false);
  const handleShowModalAddVacation = () => setModalAddVacation(true);

  useEffect(() => {
    socketService.connect();
  
    const unsubscribe = store.subscribe(() => {
      const dup = [...store.getState().vacationsState.vacations];
      setVacation(dup);
    });
  
    
    if (store.getState().vacationsState.vacations.length === 0) {
      vacationsService
        .getAllVacations()
        .then((vacationList) => {
          store.dispatch(fetchVacationsAction(vacationList));
        })
        .catch((err) => console.log(err.message));
    } else {
      const dup = [...store.getState().vacationsState.vacations];
      setVacation(dup);
    }
  
    return () => {
      unsubscribe();
      store.dispatch(fetchVacationsAction([])); 
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
    }
  }

  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = vacations.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );

  return (
    <Container className="Home  p-2">
      {authService.isUserAdmin() && (
        <div className="col-md-12  adm text-center">
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

          <Modal
            show={showModalAddVacation}
            onHide={handleCloseModalAddVacation}
          >
            <AddVacation showModalAddVacation={setModalAddVacation} />
          </Modal>
        </div>
      )}

      <Row xs={1} sm={1} md={2} lg={3} xl={5} className="g-4 m-auto">
        {currentVacations.map((v) => (
          <VacationCard
            handleFollow={handleFollowVacation}
            key={v.id}
            vacation={v}
          />
        ))}
      </Row>

      <Pagination
        vacationsPerPage={vacationsPerPage}
        totalVacations={vacations.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </Container>
  );
}

export default Home;
