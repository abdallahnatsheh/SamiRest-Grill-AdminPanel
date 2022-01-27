import { Modal, Button } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
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

const EditHeadersModal = React.memo(function EditHeadersModal(props) {
  const arabicRegex = /^[\u0621-\u064A\u0660-\u0669 ]+$/i;

  const AddImageSchema = yup.object().shape({
    paragraph: yup
      .string()
      .required("العنوان مطلوب*")
      .matches(arabicRegex, "يجب ان يكون باللغة العربية فقط")
      .min(2, "يجب ان يكون اكثر من حرفين")
      .max(50, "يجب ان يكون اقل من خمسين حرف"),
    title: yup
      .string()
      .required("العنوان مطلوب*")
      .matches(arabicRegex, "يجب ان يكون باللغة العربية فقط")
      .min(2, "يجب ان يكون اكثر من حرفين")
      .max(20, "يجب ان يكون اقل من عشرين حرف"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddImageSchema),
  });
  const onSubmit = async (data) => {
    const titleRef = doc(db, "MPGalleryHeader", props.title.id);
    const parRef = doc(db, "MPGalleryHeader", props.paragraph.id);
    await updateDoc(titleRef, {
      title: data.title,
    })
      .then(
        await updateDoc(parRef, {
          paragraph: data.paragraph,
        })
      )
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
          تعديل العناوين
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div>
            <TextField
              helperText={
                errors.title ? errors.title.message : "أدخل العنوان الرئيسي"
              }
              label="عنوان رئيسي"
              style={{ width: "100%" }}
              {...register("title")}
              minLength="2"
              maxLength="50"
              error={errors.title ? true : false}
            />
          </div>
          <div>
            <TextField
              helperText={
                errors.paragraph
                  ? errors.paragraph.message
                  : "أدخل العنوان الفرعي"
              }
              label="العنوان الفرعي"
              style={{ width: "100%" }}
              {...register("paragraph")}
              minLength="2"
              maxLength="20"
              error={errors.paragraph ? true : false}
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
export default EditHeadersModal;
