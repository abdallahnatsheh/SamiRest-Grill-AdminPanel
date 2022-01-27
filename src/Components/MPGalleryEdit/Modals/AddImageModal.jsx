import { Modal, Button } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase.Config";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
const arabicRegex = /^[\u0621-\u064A\u0660-\u0669 ]+$/i;
const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const AddImageSchema = yup.object().shape({
  img: yup
    .string()
    .required("رابط الصورة مطلوب*")
    .matches(urlRegex, "أدخل رابط صالح")
    .min(2, "يجب ان يكون اكثر من حرفين"),
  title: yup
    .string()
    .required("عنوان الصورة مطلوب*")
    .matches(arabicRegex, "العنوان باللغة العربية فقط")
    .min(2, "يجب ان يكون اكثر من حرفين")
    .max(20, "يجب ان يكون اقل من خمسين حرفا"),
});

const AddImageModal = React.memo(function AddImageModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddImageSchema),
  });
  const onSubmit = async (data) => {
    const imgRef = collection(db, "MPGallery");
    await addDoc(imgRef, {
      img: data.img,
      title: data.title,
    })
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
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">إضافة صورة</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div>
            <TextField
              helperText={
                errors.img ? errors.img.message : "قم بادخال رابط الصورة"
              }
              label="الرابط"
              style={{ width: "100%" }}
              {...register("img")}
              minLength="5"
              maxLength="300"
              error={errors.img ? true : false}
            />
          </div>
          <div>
            <TextField
              helperText={
                errors.title ? errors.title.message : "قم بادخال عنوان للصورة"
              }
              label="عنوان"
              style={{ width: "100%" }}
              {...register("title")}
              error={errors.title ? true : false}
              minLength="2"
              maxLength="20"
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
export default AddImageModal;