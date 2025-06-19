import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Modal,
  Spinner,
} from "react-bootstrap";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import EditVacation from "../EditVacation/EditVacation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./VacationCard.css";

interface VacationCardProps {
  vacation: VacationModel;
  handleFollow: Function;
  loading?: boolean;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = () => setShowModalDelete(true);
  const handleCloseModalEdit = () => setShowModalEdit(false);
  const handleShowModalEdit = () => setShowModalEdit(true);

  const {
    destination,
    followState,
    description,
    startDate,
    endDate,
    price,
    imageName,
    followers,
    id,
  } = props.vacation;

  const handleFollow = props.handleFollow;

  const startDateFormat = startDate
    ? new Date(startDate).toLocaleDateString()
    : "";
  const endDateFormat = endDate ? new Date(endDate).toLocaleDateString() : "";

  async function deleteVacation() {
    try {
      setLoadingDelete(true);
      await vacationsService.deleteVacation(id);
      setShowModalDelete(false);
      notifyService.success("The vacation was successfully removed.");
    } catch (err: any) {
      console.log(err.message);
    }
    setLoadingDelete(false);
  }

  const cardStyle: React.CSSProperties = {
    width: "15rem",
    minHeight: "420px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  return (
    <Col className="dc VacationCard d-flex justify-content-center mb-2 p-3">
      <Card className="shadow dd" style={cardStyle}>
        <div
          style={{
            position: "relative",
            height: 180,
            width: "100%",
            overflow: "hidden",
            background: "#e0e0e0",
          }}
        >
          {(!imageLoaded || props.loading) && (
            <Skeleton
              height={180}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 2,
              }}
            />
          )}
          {imageName && (
            <Card.Img
              variant="top"
              src={imageName}
              height="180"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                opacity: imageLoaded && !props.loading ? 1 : 0,
                transition: "opacity 0.3s"
              }}
              onLoad={() => setImageLoaded(true)}
              alt={destination}
            />
          )}
        </div>

        <Card.ImgOverlay className="p-2 h-50">
          {!props.loading && authService.isUserAdmin() && (
            <>
              <Button
                variant="light"
                size="sm"
                className="shadow-none"
                onClick={handleShowModalDelete}
                style={{ float: "right" }}
              >
                <i className="bi bi-trash"></i>
              </Button>
              <Button
                variant="light"
                className="shadow-none"
                size="sm"
                onClick={handleShowModalEdit}
              >
                <i className="bi bi-pencil"></i>
              </Button>
            </>
          )}
        </Card.ImgOverlay>

        {!props.loading && (
          <>
            <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Vacation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete the vacation?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  className="shadow-none"
                  onClick={handleCloseModalDelete}
                >
                  No
                </Button>
                <Button
                  variant="primary"
                  className="shadow-none"
                  onClick={deleteVacation}
                >
                  {!loadingDelete ? (
                    "Yes"
                  ) : (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showModalEdit} onHide={handleCloseModalEdit}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Vacation</Modal.Title>
              </Modal.Header>
              <EditVacation
                vacation={props.vacation}
                closModalEdit={handleCloseModalEdit}
                showModalEdit={setShowModalEdit}
              />
            </Modal>
          </>
        )}

        <Card.Body style={{ flexGrow: 1 }}>
          <Card.Title style={{ minHeight: "32px" }}>
            {props.loading ? <Skeleton width={120} /> : destination}
          </Card.Title>
          <Card.Text style={{ minHeight: "100px" }}>
            {props.loading ? <Skeleton count={3} /> : description}
          </Card.Text>
          <Badge className="p-1 mb-2" bg="info">
            {props.loading ? (
              <Skeleton width={50} />
            ) : (
              <>Followers: {followers}</>
            )}
          </Badge>
          <ListGroup>
            <ListGroupItem className="text-secondary">
              {props.loading ? (
                <Skeleton width={120} />
              ) : (
                `From: ${startDateFormat}`
              )}
            </ListGroupItem>
            <ListGroupItem className="text-secondary">
              {props.loading ? (
                <Skeleton width={120} />
              ) : (
                `To: ${endDateFormat}`
              )}
            </ListGroupItem>
            <ListGroupItem className="text-secondary">
              {props.loading ? (
                <Skeleton width={80} />
              ) : (
                `Price: ${Number(price).toLocaleString()}$`
              )}
            </ListGroupItem>
          </ListGroup>
          <div style={{ marginTop: 10 }}>
            {!authService.isUserAdmin() &&
              (props.loading ? (
                <Skeleton height={35} width="100%" />
              ) : (
                <Button
                  className="mt-1 w-100 shadow-none"
                  variant={followState === "Follow" ? "primary" : "secondary"}
                  onClick={() =>
                    handleFollow(
                      {
                        userId: store.getState().authState.user.userId,
                        vacationId: id,
                      },
                      followState
                    )
                  }
                  disabled={props.loading}
                >
                  {followState}
                </Button>
              ))}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default VacationCard;
