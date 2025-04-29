import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";

interface VacationEditProp {
  vacation: VacationModel;
  showModalEdit: Function;
  closModalEdit: Function;
}

function EditVacation(props: VacationEditProp): JSX.Element {
  const { register, setError, handleSubmit, formState } =
    useForm<VacationModel>();

  const {
    destination,
    description,
    followState,
    startDate,
    endDate,
    price,
    followers,
    id,
  } = props.vacation;
  const showModalEdit = props.showModalEdit;
  const closModalEdit = props.closModalEdit;

  const date = new Date().toISOString().split("T")[0];

  const startDateFormat = new Date(startDate).toLocaleDateString("sv-SE");
  const endDateFormat = new Date(endDate).toLocaleDateString("sv-SE");

  async function send(formVacation: VacationModel) {
    if (formVacation.image?.[0]?.name.length > 250) {
      notifyService.error("Image filename must not exceed 250 characters.");
      return;
    }

    try {
      formVacation.id = id;
      formVacation.followState = followState;
      formVacation.followers = followers;
    

      if (formVacation.startDate > formVacation.endDate) {
        return setError(
          "startDate",
          {
            type: "focus",
            message: "Start date cannot be greater than end date",
          },
          { shouldFocus: true }
        );
      }

      await vacationsService.updateVacation(formVacation);

      showModalEdit(false);
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="EditVacation">
      <Form
        className="m-auto w-100 p-4 border bg-light"
        onSubmit={handleSubmit(send)}
      >
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
              minLength: {
                value: 2,
                message: "Destination must be at least 2 characters",
              },
              maxLength: {
                value: 30,
                message: "Destination can't exceed 30 characters",
              },
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
            as="textarea"
            rows={3}
            isInvalid={!!formState.errors.description}
            {...register("description", {
              required: { value: true, message: "Missing description" },
              minLength: {
                value: 5,
                message: "Description must be at least 5 characters",
              },
              maxLength: {
                value: 90,
                message: "Description can't exceed 90 characters",
              },
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
            max="2030-01-01"
            isInvalid={!!formState.errors.startDate}
            {...register("startDate", {
              required: { value: true, message: "Missing start-date" },
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
            max="2030-01-01"
            isInvalid={!!formState.errors.endDate}
            {...register("endDate", {
              required: { value: true, message: "Missing end-date" },
            })}
            className="mb-2"
            placeholder="End date"
          />

          <Form.Control.Feedback type="invalid">
            {formState.errors.endDate?.message}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Price" className="mb-2">
          <Form.Control
            type="number"
            step="0.01"
            defaultValue={price}
            isInvalid={!!formState.errors.price}
            {...register("price", {
              required: { value: true, message: "Missing price" },
              min: { value: 100, message: "Price must be at least 100." },
              max: { value: 10000, message: "Price can't exceed 10,000." },
            })}
            placeholder="Price"
          />
          <Form.Text className="text-muted">
            Enter a price between $100 and $10,000.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            {formState.errors.price?.message}
          </Form.Control.Feedback>
        </FloatingLabel>

        <Form.Label>Select Image</Form.Label>

        <Form.Control
          type="file"
          size="sm"
          accept="image/*"
          {...register("image")}
        />

        <Modal.Body>Do you want to save the changes?</Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            className="shadow-none"
            onClick={() => closModalEdit(false)}
          >
            No
          </Button>

          <Button type="submit" className="shadow-none" variant="primary">
            Yes
          </Button>
        </Modal.Footer>
      </Form>
    </div>
  );
}

export default EditVacation;
