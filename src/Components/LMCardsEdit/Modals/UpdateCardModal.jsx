import { Modal, Button } from "react-bootstrap";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase.Config";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React from "react";

const UpdateCardsModal = React.memo(function UpdateCardsModal(props) {
  const errorStyling = {
    color: "rgb(0,0,0)",
  };

  return (
    <Formik
      initialValues={{
        Image: "",
        name: "",
        infoF: "",
        infoS: "",
        price: "",
        dealEnable: "",
        dealValue: "",
      }}
      onSubmit={async (values) => {
        console.log("insided form submit ");
        let cardRef = doc(db, "LMCards", props.cardid);
        await updateDoc(cardRef, {
          deals: {
            enabled: values.dealEnable,
            value: values.dealEnable ? values.dealValue : 0,
          },
          img: values.Image,
          info: { infoF: values.infoF, infoS: values.infoS },
          name: values.name,
          price: values.price,
        });
        props.onHide();

        console.log("submit!");
      }}
      validate={(values) => {
        const errors = {};
        const engRegex = /^[a-zA-Z ]*$/i;
        const arabicRegex = /^[\u0621-\u064A\u0660-\u0669 ]+$/i;
        const numRegex = /^[1-9][0-9]?$|^100$/i;
        const urlRegex =
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        if (!values.Image) {
          errors.Image = "الصورة مطلوبة";
        } else if (!urlRegex.test(values.Image)) {
          errors.Image = "الرابط غير صالح";
        }
        if (!values.name) {
          errors.name = "الاسم مطلوب";
        } else if (
          !engRegex.test(values.name) &&
          !arabicRegex.test(values.name)
        ) {
          errors.name = "الاسم غير صالح";
        }
        if (!values.infoF) {
          errors.infoF = "الوصف الاول مطلوب";
        } else if (
          !engRegex.test(values.infoF) &&
          !arabicRegex.test(values.infoF)
        ) {
          errors.infoF = "الوصف الاول غير صالح";
        }
        if (!values.infoS) {
          errors.infoS = "الوصف الثاني مطلوب";
        } else if (
          !engRegex.test(values.infoS) &&
          !arabicRegex.test(values.infoS)
        ) {
          errors.infoS = "الوصف الثاني غير صالح";
        }
        if (!values.price) {
          errors.price = "السعر مطلوب";
        } else if (!numRegex.test(values.price)) {
          errors.price = "السعر غير صالح";
        }
        if (values.dealEnable && !values.dealValue) {
          errors.dealValue = "الخصم مطلوب";
        } else if (values.dealEnable && !numRegex.test(values.dealValue)) {
          errors.dealValue = "الخصم غير صالح";
        }

        return errors;
      }}
    >
      {({ values }) => (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update {props.cardid}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <section className="contact-clean">
              <Form id="fooId">
                <div className="mb-3">
                  <Field
                    className="form-control"
                    name="Image"
                    placeholder=" رابط الصورة*"
                  />
                </div>
                <ErrorMessage
                  name="Image"
                  render={(msg) => (
                    <div type="invalid" style={errorStyling}>
                      {"! " + msg + " *"}
                    </div>
                  )}
                />
                <div className="mb-3">
                  <Field
                    className="form-control"
                    name="name"
                    placeholder="الاسم*"
                  />
                </div>
                <ErrorMessage
                  name="name"
                  render={(msg) => (
                    <div type="invalid" style={errorStyling}>
                      {"! " + msg + " *"}
                    </div>
                  )}
                />
                <div className="mb-3">
                  <Field
                    className="form-control"
                    name="infoF"
                    placeholder=" الوصف الاول*"
                  />
                </div>
                <ErrorMessage
                  name="infoF"
                  render={(msg) => (
                    <div type="invalid" style={errorStyling}>
                      {"! " + msg + " *"}
                    </div>
                  )}
                />
                <div className="mb-3">
                  <Field
                    className="form-control"
                    name="infoS"
                    placeholder="الوصف الثاني*"
                  />
                </div>
                <ErrorMessage
                  name="infoS"
                  render={(msg) => (
                    <div type="invalid" style={errorStyling}>
                      {"! " + msg + " *"}
                    </div>
                  )}
                />
                <div className="mb-3">
                  <Field
                    className="form-control"
                    name="price"
                    type="number"
                    placeholder="السعر*"
                  />
                </div>
                <ErrorMessage
                  name="price"
                  render={(msg) => (
                    <div type="invalid" style={errorStyling}>
                      {"! " + msg + " *"}
                    </div>
                  )}
                />
                <div className="mb-3" name="dealEnable">
                  <label>
                    <Field type="checkbox" name="dealEnable" /> هل يوجد خصم؟
                  </label>
                </div>
                {values.dealEnable ? (
                  <div className="mb-3">
                    <Field
                      className="form-control"
                      name="dealValue"
                      type="number"
                      placeholder="الخصم من 1 الى مئة بالمئة*"
                    />
                    <ErrorMessage
                      name="dealValue"
                      render={(msg) => (
                        <div type="invalid" style={errorStyling}>
                          {"! " + msg + " *"}
                        </div>
                      )}
                    />
                  </div>
                ) : (
                  ""
                )}
              </Form>
            </section>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            <Button
              type="submit"
              form="fooId"
              disabled={Formik.isValidating && Formik.isSubmitting}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
});
export default UpdateCardsModal;
