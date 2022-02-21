import { db } from "../../firebase/firebase.Config";
import { Modal, Button, Row } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect } from "react";

const arabicRegex = /^[\u0621-\u064A\u0660-\u0669 ]+$/i;
const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const AddMealSchema = yup.object().shape({
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
    .min(5, "يجب ان يكون اكثر من خمس أحرف")
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
  types: yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .required("اسم الصنف مطلوب*")
        .matches(arabicRegex, "الاسم باللغة العربية فقط")
        .min(2, "يجب ان يكون اكثر من حرفين")
        .max(20, "يجب ان يكون اقل من عشرين حرفا"),
      value: yup
        .number()
        .typeError("يجب ان يكون رقم*")
        .positive("يجب ان يكون اكبر من صفر")
        .integer("اعداد صحيحة فقط")
        .min(1, "يجب ان يكون اكبر من صفر")
        .max(100, "يجب ان يكون اقل من مئة"),
    })
  ),
  addons: yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .required("اسم الإضافة مطلوب*")
        .matches(arabicRegex, "الاسم باللغة العربية فقط")
        .min(2, "يجب ان يكون اكثر من حرفين")
        .max(20, "يجب ان يكون اقل من عشرين حرفا"),
      value: yup
        .number()
        .typeError("يجب ان يكون رقم*")
        .positive("يجب ان يكون اكبر من صفر")
        .integer("اعداد صحيحة فقط")
        .min(1, "يجب ان يكون اكبر من صفر")
        .max(100, "يجب ان يكون اقل من مئة"),
    })
  ),
});

const AddMealModal = React.memo(function AddMealModal(props) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddMealSchema),
  });

  const {
    fields: typesField,
    append: typesAppend,
    remove: typesRemove,
  } = useFieldArray({
    name: "types",
    control,
  });
  const {
    fields: addonsField,
    append: addonsAppend,
    remove: addonsRemove,
  } = useFieldArray({
    name: "addons",
    control,
  });

  const onSubmit = async (data) => {
    const mealRef = collection(db, "MainMenu");
    await addDoc(mealRef, {
      name: data.name,
      info: data.infoF,
      category: "meals",
      price: {
        defaultPrice: {
          enabled: numberOfTypes > 0 ? false : true,
          value: data.price,
        },
        types: data.types,
        addons: data.addons,
      },
      img: data.image,
      deals: {
        enabled: data.dealEnable,
        value: data.dealEnable ? data.dealValue : 0,
      },
    })
      .then(function () {
        props.onHide();
      })
      .catch(function () {
        NotificationManager.warning("خطأ في الخدمة", "خطأ", 1000);
      });
  };
  let IfDealEnabled = watch("dealEnable", false);
  let numberOfTypes = watch("numberOfTypes");
  let numberOfAddons = watch("numberOfAddons");
  useEffect(() => {
    // update field array when ticket number changed
    const newVal = parseInt(numberOfTypes || 0);
    const oldVal = typesField.length;
    if (newVal > oldVal) {
      // append tickets to field array
      for (let i = oldVal; i < newVal; i++) {
        typesAppend({ name: "", value: "" });
      }
    } else {
      // remove tickets from field array
      for (let i = oldVal; i > newVal; i--) {
        typesRemove(i - 1);
      }
    }
  }, [numberOfTypes]);

  useEffect(() => {
    // update field array when ticket number changed
    const newVal = parseInt(numberOfAddons || 0);
    const oldVal = addonsField.length;
    if (newVal > oldVal) {
      // append tickets to field array
      for (let i = oldVal; i < newVal; i++) {
        addonsAppend({ name: "", value: "" });
      }
    } else {
      // remove tickets from field array
      for (let i = oldVal; i > newVal; i--) {
        addonsRemove(i - 1);
      }
    }
  }, [numberOfAddons]);

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
              label="رابط الصورة"
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
          <div className="card-body border-bottom">
            <div className="form-row">
              <div className="form-group">
                <label>أدخل اصناف الوجبة</label>
                <select
                  name="numberOfTypes"
                  {...register("numberOfTypes")}
                  className={`form-control ${
                    errors.numberOfTypes ? "is-invalid" : ""
                  }`}
                >
                  {["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">
                  {errors.numberOfTypes?.message}
                </div>
              </div>
            </div>
          </div>
          {typesField.map((item, i) => (
            <div key={i} className="list-group list-group-flush">
              <div className="list-group-item">
                <h5 className="card-title"> {i + 1} الصنف رقم</h5>
                <Row className="form-row">
                  <div className="form-group col-6">
                    <TextField
                      helperText={
                        errors.types?.[i]?.name
                          ? errors.types?.[i]?.name?.message
                          : "قم بادخال الأسم   "
                      }
                      label="الأسم"
                      name={`types[${i}]name`}
                      style={{ width: "100%" }}
                      {...register(`types.${i}.name`)}
                      type="text"
                      error={errors.types?.[i]?.name ? true : false}
                    />
                  </div>

                  <div className="form-group col-6">
                    <TextField
                      helperText={
                        errors.types?.[i]?.value
                          ? errors.types?.[i]?.value?.message
                          : "قم بادخال السعر   "
                      }
                      label="السعر"
                      name={`types[${i}]value`}
                      style={{ width: "100%" }}
                      {...register(`types.${i}.value`)}
                      type="number"
                      error={errors.types?.[i]?.value ? true : false}
                    />
                  </div>
                </Row>
              </div>
            </div>
          ))}
          <div className="card-body border-bottom">
            <div className="form-row">
              <div className="form-group">
                <label>أدخل إضافات الوجبة</label>
                <select
                  name="numberOfAddons"
                  {...register("numberOfAddons")}
                  className={`form-control ${
                    errors.numberOfAddons ? "is-invalid" : ""
                  }`}
                >
                  {["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">
                  {errors.numberOfAddons?.message}
                </div>
              </div>
            </div>
          </div>
          {addonsField.map((item, i) => (
            <div key={i} className="list-group list-group-flush">
              <div className="list-group-item">
                <h5 className="card-title"> {i + 1} الأضافة رقم</h5>
                <Row className="form-row">
                  <div className="form-group col-6">
                    <TextField
                      helperText={
                        errors.addons?.[i]?.name
                          ? errors.addons?.[i]?.name?.message
                          : "قم بادخال الأسم   "
                      }
                      label="الأسم"
                      name={`addons[${i}]name`}
                      style={{ width: "100%" }}
                      {...register(`addons.${i}.name`)}
                      type="text"
                      error={errors.addons?.[i]?.name ? true : false}
                    />
                  </div>

                  <div className="form-group col-6">
                    <TextField
                      helperText={
                        errors.addons?.[i]?.value
                          ? errors.addons?.[i]?.value?.message
                          : "قم بادخال السعر   "
                      }
                      label="السعر"
                      name={`addons[${i}]value`}
                      style={{ width: "100%" }}
                      {...register(`addons.${i}.value`)}
                      type="number"
                      error={errors.addons?.[i]?.value ? true : false}
                    />
                  </div>
                </Row>
              </div>
            </div>
          ))}
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
export default AddMealModal;
