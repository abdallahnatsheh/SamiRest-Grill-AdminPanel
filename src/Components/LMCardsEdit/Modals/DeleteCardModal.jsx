import { Modal, Button } from "react-bootstrap";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.Config";

// delete image from database with the image id in the swiper

const DeleteCardModal = (props) => {
  const docRef = async () => {
    const noteRef = doc(db, "LMCards", props.card);
    await deleteDoc(noteRef);
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete {props.card}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>are you sure you want to delete me ?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="danger" onClick={docRef} type="submit">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DeleteCardModal;
