import { useState } from "react";
import { Button, FloatingLabel, Modal, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";

interface VacationAddProp {
  showModalAddVacation?: Function;
  onVacationAdded?: () => void;
}

function AddVacation(props: VacationAddProp): JSX.Element {
  const { register, setError, handleSubmit, formState } =
    useForm<VacationModel>();
  const [loading, setLoading] = useState<boolean>(false);

  const date = new Date().toISOString().split("T")[0];

  async function send(formVacation: VacationModel) {
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

    if (formVacation.image?.[0]?.name.length > 250) {
      notifyService.error("Image filename must not exceed 250 characters.");
      return;
    }

    try {
      setLoading(true);
      await vacationsService.addVacation(formVacation);
      if (props.onVacationAdded) props.onVacationAdded();
      props.showModalAddVacation(false);
      notifyService.success("The vacation was successfully added.");
    } catch (err: any) {
      alert(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="AddVacation">
      <Modal.Header closeButton>
        <Modal.Title>Add Vacation</Modal.Title>
      </Modal.Header>

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
            maxLength={30}
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
            maxLength={90}
            style={{ height: "90px", resize: "none" }}
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
            className="mb-3"
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
            step="100.00"
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
          isInvalid={!!formState.errors.image}
          {...register("image")}
        />

        <Form.Control.Feedback type="invalid">
          {formState.errors.image?.message}
        </Form.Control.Feedback>

        <Modal.Body>Do you want to save the changes?</Modal.Body>

        <Modal.Footer>
          <Button type="submit" className="w-100 shadow-none" variant="primary">
            {!loading ? (
              "Add"
            ) : (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </div>
  );
}

export default AddVacation;
