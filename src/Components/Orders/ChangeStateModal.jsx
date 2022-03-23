import { Modal, Button } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.Config";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import React from "react";
// delete image from database with the image id in the swiper

const ChangeStateModal = React.memo(function ChangeStateModal(props) {
  const docRef = async () => {
    const noteRef =
      props.ordertype === 1
        ? doc(db, "orders", props.orderid)
        : doc(db, "specialOrders", props.orderid);
    await updateDoc(noteRef, {
      status: props.orderstatus,
    })
      .then(function () {
        props.onHide();
        window.location.reload(false);
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
          {props.orderId} تعديل حالة
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>هل انت متأكد من ذلك ؟</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>اغلاق</Button>
        <Button variant="danger" onClick={docRef} type="submit">
          تغيير
        </Button>
      </Modal.Footer>
      <NotificationContainer />
    </Modal>
  );
});
export default ChangeStateModal;
