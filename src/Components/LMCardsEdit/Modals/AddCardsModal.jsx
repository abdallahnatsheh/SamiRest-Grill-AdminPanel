import { db } from "../../firebase/firebase.Config";
import { Modal, Button } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
const arabicRegex = /^[\u0621-\u064A\u0660-\u0669 ]+$/i;
const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const AddCardSchema = yup.object().shape({
  image: yup
    .string()
    .required("رابط الصورة مطلوب*")
    .matches(urlRegex, "أدخل رابط صالح")
    .min(2, "يجب ان يكون اكثر من حرفين")
    .max(300, "الرابط طويل اكثر من اللازم"),
  name: yup
    .string()
    .required("اسم الوجبة مطلوب*")
    .matches(arabicRegex, "الاسم باللغة العربية فقط")
    .min(2, "يجب ان يكون اكثر من حرفين")
    .max(20, "يجب ان يكون اقل من عشرين حرفا"),
  infoF: yup
    .string()
    .required("الوصف الاول  مطلوب*")
    .matches(arabicRegex, "الوصف باللغة العربية فقط")
    .min(50, "يجب ان يكون اكثر من خمسين حرف")
    .max(100, "يجب ان يكون اقل من مئة حرف"),
  infoS: yup
    .string()
    .required("الوصف الاول  مطلوب*")
    .matches(arabicRegex, "الوصف باللغة العربية فقط")
    .min(5, "يجب ان يكون اكثر من خمسة")
    .max(100, "يجب ان يكون اقل من مئة حرف"),
  price: yup
    .number()
    .typeError("يجب ان يكون رقم*")
    .required("السعر مطلوب*")
    .positive("يجب ان يكون اكبر من صفر")
    .min(1, "يجب ان يكون اكبر من صفر")
    .max(1000, "يجب ان يكون اقل من ألف"),
  dealEnable: yup.boolean(),
  dealValue: yup.number().when("dealEnable", {
    is: true,
    then: yup
      .number()
      .typeError("يجب ان يكون رقم*")
      .required("نسبة الخصم مطلوبة")
      .positive("يجب ان يكون اكبر من صفر")
      .integer("اعداد صحيحة فقط")
      .min(1, "يجب ان يكون اكبر من صفر")
      .max(100, "يجب ان يكون اقل من مئة"),
  }),
});

const AddImageModal = React.memo(function AddImageModal(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddCardSchema),
  });
  const onSubmit = async (data) => {
    const cardRef = collection(db, "LMCards");
    await addDoc(cardRef, {
      deals: {
        enabled: data.dealEnable,
        value: data.dealEnable ? data.dealValue : 0,
      },
      img: data.image,
      info: { infoF: data.infoF, infoS: data.infoS },
      name: data.name,
      price: data.price,
    })
      .then(function () {
        props.onHide();
      })
      .catch(function () {
        NotificationManager.warning("خطأ في الخدمة", "خطأ", 1000);
      });
  };
  let IfDealEnabled = watch("dealEnable", false);

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
                errors.image ? errors.image.message : "قم بادخال رابط الصورة"
              }
              label="الرابط"
              style={{ width: "100%" }}
              {...register("image")}
              minLength="5"
              maxLength="300"
              error={errors.image ? true : false}
            />
          </div>
          <div>
            <TextField
              helperText={
                errors.name ? errors.name.message : "قم بادخال إسم الوجبة "
              }
              label="الإسم"
              style={{ width: "100%" }}
              {...register("name")}
              maxLength="21"
              error={errors.name ? true : false}
            />
          </div>
          <div>
            <TextField
              helperText={
                errors.infoF ? errors.infoF.message : "قم بادخال الوصف الرئيسي "
              }
              label="الوصف الرئيسي"
              style={{ width: "100%" }}
              {...register("infoF")}
              maxLength="21"
              error={errors.infoF ? true : false}
            />
          </div>
          <div>
            <TextField
              helperText={
                errors.infoS ? errors.infoS.message : "قم بادخال الوصف الفرعي "
              }
              label="الوصف الفرعي"
              style={{ width: "100%" }}
              {...register("infoS")}
              maxLength="21"
              error={errors.infoS ? true : false}
            />
          </div>
          <div>
            <TextField
              helperText={
                errors.price ? errors.price.message : "قم بادخال السعر  "
              }
              label=" السعر"
              style={{ width: "100%" }}
              {...register("price")}
              type="number"
              error={errors.price ? true : false}
            />
          </div>
          <div className="form-check">
            <Checkbox
              type="checkbox"
              id="dealEnable"
              {...register("dealEnable")}
            />
            <label className="form-check-label" htmlFor="dealEnable">
              هل يوجد خصم؟
            </label>
          </div>
          {IfDealEnabled ? (
            <div>
              <TextField
                helperText={
                  errors.dealValue
                    ? errors.dealValue.message
                    : "قم بادخال نسبة الخصم  "
                }
                label=" نسبة الخصم"
                style={{ width: "100%" }}
                {...register("dealValue")}
                type="number"
                error={errors.dealValue ? true : false}
              />
            </div>
          ) : (
            ""
          )}
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
