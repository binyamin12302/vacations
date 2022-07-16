import { useState } from "react";
import { Badge, Button, Card, Col, ListGroup, ListGroupItem, Modal, Spinner } from "react-bootstrap";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/Config";
import EditVacation from "../EditVacation/EditVacation";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
    handleFollow: Function;
}


function VacationCard(props: VacationCardProps): JSX.Element {

    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => setShowModalDelete(true);
    const handleCloseModalEdit = () => setShowModalEdit(false);
    const handleShowModalEdit = () => setShowModalEdit(true);


    const { destination, followState, description, startDate, endDate, price,
        imageName, followers, id } = props.vacation;

    const handleFollow = props.handleFollow;

    const startDateFormat = new Date(startDate).toLocaleDateString();
    const endDateFormat = new Date(endDate).toLocaleDateString();

    async function deleteVacation() {
        try {
            setLoading(true);
            await vacationsService.deleteVacation(id)
            setShowModalDelete(false)
            notifyService.success("The vacation was successfully removed.");
        }
        catch (err: any) {
            console.log(err.message);
        }
    }

    return (
        <Col className="dc VacationCard  d-flex justify-content-center mb-2 p-3" >
            <Card className="shadow dd" style={{ width: '15rem' }} >
                <Card.Img variant="top" src={config.vacationImageUrl + imageName} height="180" />

                <Card.ImgOverlay className="p-2 h-50">

                    {authService.isUserAdmin() &&
                        <>
                            <Button variant="light" size="sm" className="shadow-none"
                                onClick={handleShowModalDelete}
                                style={{ float: "right" }} ><i className="bi bi-trash"></i>
                            </Button>
                            <Button variant="light" className="shadow-none" size="sm"
                                onClick={handleShowModalEdit}
                            ><i className="bi bi-pencil"></i></Button>
                        </>
                    }

                </Card.ImgOverlay>


                <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Vacation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete the vacation?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="shadow-none" onClick={handleCloseModalDelete}>
                            No
                        </Button>
                        <Button variant="primary" className="shadow-none" onClick={deleteVacation}>
                            {!loading ? "Yes" :
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            }
                        </Button>
                    </Modal.Footer>
                </Modal>


                <Modal show={showModalEdit} onHide={handleCloseModalEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Vacation</Modal.Title>
                    </Modal.Header>
                    <EditVacation vacation={props.vacation}
                        closModalEdit={handleCloseModalEdit} showModalEdit={setShowModalEdit} />
                </Modal>


                <Card.Body>
                    <Card.Title>{destination}</Card.Title>
                    <Card.Text >
                        {description}
                    </Card.Text>
                    <Badge className="p-1 mb-2" bg="info">Followers: {followers}</Badge>

                    <ListGroup >
                        <ListGroupItem className="text-secondary" >From: {startDateFormat}</ListGroupItem>
                        <ListGroupItem className="text-secondary">To: {endDateFormat} </ListGroupItem>
                        <ListGroupItem className="text-secondary">Price: {price}$</ListGroupItem>
                    </ListGroup>

                    {!authService.isUserAdmin() &&
                        <Button className="mt-2 w-100 shadow-none" variant={followState === "Follow" ?
                            "primary" : "secondary"
                        }
                            onClick={() =>
                                handleFollow({
                                    userId: store.getState().authState.user.userId,
                                    vacationId: id,
                                }, followState)}>

                            {followState}
                        </Button>
                    }
                </Card.Body>
            </Card>
        </Col>
    );
}

export default VacationCard;
