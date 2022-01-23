import { Modal, Button } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.Config";
import { Formik, Field, Form, ErrorMessage } from "formik";

const EditHeadersModal = (props) => {
  const errorStyling = {
    color: "rgb(0,0,0)",
  };

  return (
    <Formik
      initialValues={{
        title: props.title ? props.title.data().title : "",
        paragraph: props.paragraph ? props.paragraph.data().paragraph : "",
      }}
      onSubmit={async (values) => {
        const titleRef = doc(db, "LMCardsHeader", props.title.id);
        const parRef = doc(db, "LMCardsHeader", props.paragraph.id);
        await updateDoc(titleRef, {
          title: values.title,
        });
        await updateDoc(parRef, {
          paragraph: values.paragraph,
        });
        props.onHide();
      }}
      validate={(values) => {
        const errors = {};
        const nameRegex = /^[a-zA-Z ]*$/i;
        const nameArabicRegex = /^[\u0621-\u064A\u0660-\u0669 ]+$/i;
        if (!values.title) {
          errors.title = "الاسم مطلوب";
        } else if (
          !nameArabicRegex.test(values.title) &&
          !nameRegex.test(values.title)
        ) {
          errors.title = "الاسم غير صالح";
        }
        if (!values.paragraph) {
          errors.paragraph = "الوصف مطلوب";
        } else if (
          !values.paragraph ||
          (!nameRegex.test(values.paragraph) &&
            !nameArabicRegex.test(values.paragraph))
        ) {
          errors.paragraph = "الوصف غير صالح";
        }

        return errors;
      }}
    >
      {() => (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update Headers
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <section className="contact-clean">
              <Form id="fooId">
                <div className="mb-3">
                  <Field
                    className="form-control"
                    type="text"
                    htmlFor="title"
                    name="title"
                    placeholder="الاسم*"
                    minLength="2"
                    maxLength="50"
                    required
                  />
                </div>
                <ErrorMessage
                  name="title"
                  render={(msg) => (
                    <div type="invalid" style={errorStyling}>
                      {"! " + msg + " *"}
                    </div>
                  )}
                />
                <div className="mb-3">
                  <Field
                    className="form-control"
                    name="paragraph"
                    placeholder="الوصف*"
                    rows="14"
                    minLength="5"
                    maxLength="100"
                    required
                  />
                </div>
                <ErrorMessage
                  name="paragraph"
                  render={(msg) => (
                    <div type="invalid" style={errorStyling}>
                      {"! " + msg + " *"}
                    </div>
                  )}
                />
              </Form>
            </section>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            <Button type="submit" form="fooId">
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};
export default EditHeadersModal;
