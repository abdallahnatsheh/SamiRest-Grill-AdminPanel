import React, { useState } from "react";
import Header from "../Components/AdminNavBar/Header";
import AdminNavBar from "../Components/AdminNavBar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./profile.css";
import { Button, Container, Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import * as Yup from "yup";
import "react-datetime/css/react-datetime.css";
import MyDatePicker from "./MyDatePicker";
import moment from "moment";
import {
  query,
  getDocs,
  collection,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../Components/firebase/firebase.Config";
import { NotificationManager } from "react-notifications";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//this component used by customers to edit and manage their profile data and picture

const errorStyling = {
  color: "rgb(0,0,0)",
};
const Profile = React.memo(function Profile() {
  //regex for validations
  const arabicRegex = /^[\u0621-\u064A\u0660-\u0669 ]+$/i;
  const phoneRegex = /^(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/i;
  //recive user login and data from context
  const { currentUser, dataUser } = useAuth();
  //get image directory
  const [image, setImage] = useState(null);
  //get image url after upload to storage
  const [url, setUrl] = useState(null);

  //check image type and size allow only jpg and png types that less than 5 mb
  const handleImageChange = (e) => {
    if (e.target.files[0] && e.target.files[0].size < 5242880) {
      switch (e.target.files[0].type) {
        case "image/jpeg":
          setImage(e.target.files[0]);
          break;
        case "image/png":
          setImage(e.target.files[0]);
          break;
        default:
          NotificationManager.error("ملف غير صالح", "خطأ", 5000);
          setImage(null);
      }
    }
  };

  //upload chosen image to storange in the user directory so every user have his oun storage file
  //then add the link to user data for future use
  const handleSubmit = () => {
    if (image) {
      const imageRef = ref(
        storage,
        `/AdminEmp/images/${currentUser.uid}/perosnalimage`
      );
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              const userData = doc(db, "AdminEmp", currentUser.uid);
              updateDoc(userData, {
                personalImage: url,
              }).then(
                NotificationManager.success(
                  "تم تحديث الملف",
                  "نجحت العملية ",
                  5000
                )
              );
              setUrl(url);
            })
            .catch((error) => {
              NotificationManager.error("مشكلة في خدمة سحابية", "خطأ", 5000);
            });
          setImage(null);
        })
        .catch((error) => {
          NotificationManager.error("مشكلة في خدمة سحابية", "خطأ", 5000);
        });
    } else {
      NotificationManager.error("إختر صورة من فضلك", "خطأ", 5000);
    }
  };
  //afte getting user data from context its parsed to be edited
  return dataUser.length !== 0 ? (
    <div id="wrapper">
      <AdminNavBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <Header title={"ملف شخصي"} />
        <div id="content">
          {" "}
          <Formik
            initialValues={{
              firstName: dataUser.firstName ? dataUser.firstName : "",
              lastName: dataUser.lastName ? dataUser.lastName : "",
              firstAddress: dataUser.firstAddress ? dataUser.firstAddress : "",
              secondAddress: dataUser.secondAddress
                ? dataUser.secondAddress
                : "",
              phoneNumber: dataUser.phoneNumber ? dataUser.phoneNumber : "",
              birthday: dataUser.birthday ? dataUser.birthday : "",
            }}
            onSubmit={async (values, actions) => {
              try {
                //check if user is exist and submit his data to firestore
                const profileRef = collection(db, "AdminEmp");
                const q = query(
                  profileRef,
                  where("uid", "==", currentUser.uid)
                );
                const docs = await getDocs(q);
                if (docs.docs.length !== 0) {
                  const userData = doc(db, "AdminEmp", currentUser.uid);
                  await updateDoc(userData, {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    firstAddress: values.firstAddress,
                    secondAddress: values.secondAddress,
                    phoneNumber: values.phoneNumber,
                    birthday: moment(values.birthday).format("YYYY-MM-DD"),
                  }).then(
                    NotificationManager.success(
                      "تم تحديث الحساب",
                      "تم بنجاح",
                      5000
                    )
                  );
                }
              } catch {
                NotificationManager.error("خطأ في الخدمة ", "خطأ", 5000);
              }

              actions.setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string()
                .matches(arabicRegex, "الاسم باللغة العربية فقط")
                .required("الاسم الشخصي مطلوب"),
              lastName: Yup.string()
                .matches(arabicRegex, "الاسم باللغة العربية فقط")
                .required("اسم العائلة مطلوب"),
              firstAddress: Yup.string().required("العنوان الأول  مطلوب"),
              secondAddress: Yup.string().required("العنوان الثاني  مطلوب"),
              phoneNumber: Yup.string()
                .matches(phoneRegex, "رقم الهاتف غير صالح")
                .required("رقم الهاتف مطلوب"),
              birthday: Yup.date("التاريخ غير صالح").required(
                "تاريخ الميلاد مطلوب"
              ),
            })}
          >
            {({ isSubmitting }) => (
              <Container className="container-xl px-4 mt-4">
                <hr className="profile mt-0 mb-4" />
                <Form>
                  <div className="row">
                    <div className="col-xl-4">
                      <div className="card mb-4 mb-xl-0">
                        <div className="card-header">الصورة الشخصية</div>
                        <div className="card-body text-center">
                          <img
                            className="img-account-profile rounded-circle mb-2"
                            src={
                              dataUser.personalImage
                                ? dataUser.personalImage
                                : url
                            }
                            alt="ClickMe!"
                            type="file"
                          ></img>
                          <input
                            type="file"
                            onChange={handleImageChange}
                          ></input>

                          <div
                            className="small font-italic text-muted mb-4 "
                            id="uploadInfo"
                          >
                            وبحجم 5 ميجا على الاكثر jpg , png صورة بامتداد
                          </div>
                          <Button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleSubmit}
                            id="saveBtn"
                          >
                            حفظ الصورة
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-8">
                      <div className="card mb-4">
                        <div className="card-header">معلومات الحساب</div>
                        <div className="card-body">
                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                الإسم الشخصي
                              </label>
                              <Field
                                className="form-control"
                                id="inputFirstName"
                                type="text"
                                placeholder="أدخل اسمك الشخصي"
                                name="firstName"
                              />
                              <ErrorMessage
                                name="firstName"
                                render={(msg) => (
                                  <div type="invalid" style={errorStyling}>
                                    {"! " + msg + " *"}
                                  </div>
                                )}
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                اسم العائلة
                              </label>
                              <Field
                                className="form-control"
                                id="inputLastName"
                                type="text"
                                placeholder="ادخل اسم العائلة"
                                name="lastName"
                              />
                              <ErrorMessage
                                name="lastName"
                                render={(msg) => (
                                  <div type="invalid" style={errorStyling}>
                                    {"! " + msg + " *"}
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label
                                className="small mb-1"
                                htmlFor="inputOrgName"
                              >
                                العنوان الاساسي
                              </label>
                              <Field
                                className="form-control"
                                id="inputOrgName"
                                type="text"
                                placeholder="ادخل عنوانك الاساسي"
                                name="firstAddress"
                              />
                              <ErrorMessage
                                name="firstAddress"
                                render={(msg) => (
                                  <div type="invalid" style={errorStyling}>
                                    {"! " + msg + " *"}
                                  </div>
                                )}
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                className="small mb-1"
                                htmlFor="inputLocation"
                              >
                                العنوان الثانوي
                              </label>
                              <Field
                                className="form-control"
                                id="inputLocation"
                                type="text"
                                placeholder="ادخل عنوانك الثانوي"
                                name="secondAddress"
                              />
                              <ErrorMessage
                                name="secondAddress"
                                render={(msg) => (
                                  <div type="invalid" style={errorStyling}>
                                    {"! " + msg + " *"}
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label
                                className="small mb-1"
                                htmlFor="inputPhone"
                              >
                                رقم الهاتف
                              </label>
                              <Field
                                className="form-control"
                                id="inputPhone"
                                type="tel"
                                placeholder="أدخل رقم هاتفك"
                                name="phoneNumber"
                              />
                              <ErrorMessage
                                name="phoneNumber"
                                render={(msg) => (
                                  <div type="invalid" style={errorStyling}>
                                    {"! " + msg + " *"}
                                  </div>
                                )}
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                className="small mb-1"
                                htmlFor="inputBirthday"
                              >
                                تاريخ الميلاد
                              </label>
                              <MyDatePicker name="birthday" />
                              <ErrorMessage
                                name="birthday"
                                render={(msg) => (
                                  <div type="invalid" style={errorStyling}>
                                    {"! " + msg + " *"}
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                          <Button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isSubmitting}
                            id="saveBtn"
                          >
                            حفظ التغييرات
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </Container>
            )}
          </Formik>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
});

export default Profile;
