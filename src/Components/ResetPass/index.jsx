import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./resetpass.css";
import { Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import * as Yup from "yup";
import Reaptcha from "reaptcha";

const errorStyling = {
  color: "rgb(0,0,0)",
};

const loginBtnStyle = {
  background: "rgb(59, 89, 152)",
  color: "rgb(255,255,255)",
  borderWidth: "0px",
  borderColor: "rgb(59, 89, 152)",
};

/*
reset password page to change the password
*/
const ResetPass = () => {
  const { resetPassword } = useAuth();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const TEST_SITE_KEY = "6LfFnrQeAAAAAOJrOzbsUEjenIEzjwzl92ujj5qB";
  const [capVerify, setCapVerify] = useState("");
  const onVerify = () => {
    setCapVerify(true);
  };
  return (
    <div className="special-order-page">
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={async (values, actions) => {
          await resetPassword(values.email);
          actions.setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("البريد الالكتروني غير صالح")
            .matches(emailRegex, "البريد الالكتروني غير صالح")
            .required("البريد الالكتروني مطلوب"),
        })}
      >
        {({ isSubmitting }) => (
          <section
            className="register-photo"
            style={{ background: "rgb(78, 115, 223)" }}
          >
            <Container className="form-container">
              <Form style={{ background: "#ffffff" }}>
                <h1 style={{ color: "rgb(0,0,0)" }}>
                  <br />
                  <strong> تغيير كلمة المرور </strong>
                  <br />
                  <br />
                </h1>

                <div className="mb-3">
                  <Field
                    id="exampleInputEmail"
                    htmlFor="email"
                    autoComplete="email"
                    className="border rounded-pill form-control form-control-user"
                    type="email"
                    aria-describedby="emailHelp"
                    placeholder="البريد الالكتروني"
                    name="email"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  render={(msg) => (
                    <div type="invalid" style={errorStyling}>
                      {"! " + msg + " *"}
                    </div>
                  )}
                />

                <Reaptcha sitekey={TEST_SITE_KEY} onVerify={onVerify} />
                <button
                  className="btn btn-primary border rounded-pill d-block btn-user w-100"
                  type="submit"
                  style={loginBtnStyle}
                  disabled={isSubmitting || !capVerify}
                >
                  تغيير كلمة المرور
                </button>
              </Form>
            </Container>
          </section>
        )}
      </Formik>
    </div>
  );
};

export default ResetPass;
