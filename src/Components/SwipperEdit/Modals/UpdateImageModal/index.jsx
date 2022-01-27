import { Modal, Button } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.Config";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";

const UpdateImageModal = React.memo(function UpdateImageModal(props) {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const UpdateImage = yup.object().shape({
    img: yup
      .string()
      .required()
      .matches(urlRegex, "ادخل رابط صالح")
      .min(2, "يجب ان يكون اكثر من حرفين"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UpdateImage),
  });
  const onSubmit = async (data) => {
    const imgRef = doc(db, "SwipperMainPage", props.image);
    await updateDoc(imgRef, {
      image: data.img,
    })
      .then(function () {
        props.onHide();
      })
      .catch(function () {
        NotificationManager.warning("حدث خطأ بالخدمة", "خطأ", 2000);
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
          {props.image} تعديل
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div>
            <TextField
              helperText={errors.img ? errors.img.message : "ادخل رابط الصورة"}
              label="الرابط"
              style={{ width: "100%" }}
              {...register("img")}
              error={errors.img ? true : false}
              minLength="5"
              maxLength="500"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>اغلاق</Button>
          <Button type="submit">حفظ</Button>
        </Modal.Footer>
      </form>
      <NotificationContainer />
    </Modal>
  );
});
export default UpdateImageModal;
