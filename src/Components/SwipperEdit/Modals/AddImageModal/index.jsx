import { Modal, Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.Config";
import { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const AddImageModal = (props) => {
  const [url, setUrl] = useState("");

  const docRef = async () => {
    if (!url) {
      NotificationManager.warning("Url is invalid", "Error");
      return;
    } else {
      await addDoc(collection(db, "SwipperMainPage"), {
        image: url,
      });
      setUrl("");
      NotificationManager.success("Image Added", "Success");
      props.onHide();
      return;
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>URL:</h4>
        <input
          type="text"
          placeholder="paste image url"
          style={{ width: "100%" }}
          onChange={(event) => setUrl(event.target.value)}
          required
        ></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={docRef} type="submit">
          Save
        </Button>
      </Modal.Footer>
      <NotificationContainer />
    </Modal>
  );
};
export default AddImageModal;
