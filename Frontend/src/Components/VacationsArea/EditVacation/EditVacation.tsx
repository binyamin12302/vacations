import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";


interface VacationEditProp {
    vacation: VacationModel;
    showModalEdit: Function;
    closModalEdit: Function;
}


function EditVacation(props: VacationEditProp): JSX.Element {

    const { register, setError, handleSubmit, formState } = useForm<VacationModel>();


    const { destination, description, followState, startDate, endDate, price, followers, id } = props.vacation;
    const showModalEdit = props.showModalEdit;
    const closModalEdit = props.closModalEdit;

    const date = new Date().toISOString().split('T')[0];


    const startDateFormat = new Date(startDate).toLocaleDateString("sv-SE")
    const endDateFormat = new Date(endDate).toLocaleDateString("sv-SE")


    async function send(formVacation: VacationModel) {
        try {

            formVacation.id = id;
            formVacation.followState = followState;
            formVacation.followers = followers;

            if (formVacation.startDate > formVacation.endDate) {
                return setError("startDate", {
                    type: "focus",
                    message: "Start date cannot be greater than end date"
                },
                    { shouldFocus: true })
            }

            await vacationsService.updateVacation(formVacation);

            showModalEdit(false);

        }
        catch (err: any) {
            alert(err.message);
        }
    }


    return (
        <div className="EditVacation">

            <Form className="m-auto w-100 p-4 border bg-light" onSubmit={handleSubmit(send)} >

                <FloatingLabel
                    controlId="floatingInput"
                    label="Destination"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        isInvalid={!!formState.errors.destination}
                        {...register("destination", {
                            required: { value: true, message: "Missing destination" },
                            minLength: { value: 2, message: "Destination too short" },
                            maxLength: { value: 30, message: "Destination too long" }
                        })}
                        placeholder="Destination"
                        defaultValue={destination}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formState.errors.destination?.message}
                    </Form.Control.Feedback>
                </FloatingLabel>


                <FloatingLabel
                    controlId="floatingInput"
                    label="Description"
                    className="mb-3"
                >
                    <Form.Control
                        as="textarea" rows={3}
                        isInvalid={!!formState.errors.description}
                        {...register("description", {
                            required: { value: true, message: "Missing description" },
                            minLength: { value: 10, message: "Description too short" },
                            maxLength: { value: 70, message: "Description too long" }
                        })}
                        defaultValue={description}
                        placeholder="Description"
                    />

                    <Form.Control.Feedback type="invalid">
                        {formState.errors.description?.message}
                    </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Start Date"
                    className="mb-2"
                >

                    <Form.Control
                        type="date"
                        defaultValue={startDateFormat}
                        min={date}
                        max='2030-01-01'
                        isInvalid={!!formState.errors.startDate}
                        {...register("startDate", {
                            required: { value: true, message: "Missing start-date" }
                        })}
                    />

                    <Form.Control.Feedback type="invalid">
                        {formState.errors.startDate?.message}
                    </Form.Control.Feedback>

                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="End Date"
                    className="mb-2"
                >

                    <Form.Control
                        type="date"
                        defaultValue={endDateFormat}
                        min={date}
                        max='2030-01-01'
                        isInvalid={!!formState.errors.endDate}
                        {...register("endDate", {
                            required: { value: true, message: "Missing end-date" }
                        })}
                        className="mb-2"
                        placeholder="End date"
                    />

                    <Form.Control.Feedback type="invalid">
                        {formState.errors.endDate?.message}
                    </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Price"
                    className="mb-2"
                >


                    <Form.Control
                        type="number"
                        step="0.01"
                        defaultValue={price}
                        isInvalid={!!formState.errors.price}
                        {...register("price", {
                            required: { value: true, message: "Missing price" },
                            min: { value: 0, message: "Price can't be negative" },
                            max: { value: 1000, message: "Price can't exceeds 1000" }
                        })}
                        placeholder="Price"
                    />
                    <Form.Control.Feedback type="invalid">
                        {formState.errors.price?.message}
                    </Form.Control.Feedback>

                </FloatingLabel>

                <Form.Label >Select Image</Form.Label>

                <Form.Control type="file" size="sm" accept="image/*"
                    {...register("image")} />

                <Modal.Body>Do you want to save the changes?</Modal.Body>

                <Modal.Footer>

                    <Button variant="secondary" className="shadow-none" onClick={() => closModalEdit(false)} >
                        No
                    </Button>

                    <Button type="submit" className="shadow-none" variant="primary" >
                        Yes
                    </Button>

                </Modal.Footer>

            </Form>
        </div>
    );
}

export default EditVacation;
