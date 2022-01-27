import { Modal, Button } from "react-bootstrap";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.Config";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import React from "react";
// delete image from database with the image id in the swiper

const DeleteImageModal = React.memo(function DeleteImageModal(props) {
  const docRef = async () => {
    const noteRef = doc(db, "MPGallery", props.image);
    await deleteDoc(noteRef)
      .then(function () {
        props.onHide();
      })
      .catch(function () {
        NotificationManager.warning("حدث خطأ بالخدمة", "خطأ", 1000);
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
          {props.image} احذف
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>هل انت متأكد من حذفي ؟</h4>
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
});
export default DeleteImageModal;
