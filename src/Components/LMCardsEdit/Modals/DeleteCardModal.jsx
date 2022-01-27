import { Modal, Button } from "react-bootstrap";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.Config";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
// delete image from database with the image id in the swiper

const DeleteCardModal = (props) => {
  const docRef = async () => {
    const noteRef = doc(db, "LMCards", props.card);
    await deleteDoc(noteRef)
      .then(function () {
        props.onHide();
      })
      .catch(function () {
        NotificationManager.warning("خطأ في الخدمة", "خطأ", 1000);
      });
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
          {props.card} احذف
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>هل تريد حذفي فعلا ؟</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>اغلاق</Button>
        <Button variant="danger" onClick={docRef} type="submit">
          حذف
        </Button>
      </Modal.Footer>
      <NotificationContainer />
    </Modal>
  );
};
export default DeleteCardModal;
