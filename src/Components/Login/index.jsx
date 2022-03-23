import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./style.css";
import { Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import * as Yup from "yup";
import Reaptcha from "reaptcha";

const errorStyling = {
  color: "rgb(0,0,0)",
};

const loginBtnStyle = {
  background: "rgb(59,89,152)",
  borderWidth: "0px",
  borderColor: "rgb(210,141,8)",
};

/*
login page with formik form and validation , now its connected with firebase 
*/
const Login = () => {
  //importing authentication function from authentication context
  const { login } = useAuth();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const onealpha = /[a-z]/i;
  const onenum = /[0-9~!@#$%^&*()_+\-={}|[\]\\:";'<>?,./]/i;
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
          password: "",
        }}
        onSubmit={async (values, actions) => {
          await login(values.email, values.password);
          actions.setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("البريد الالكتروني غير صالح")
            .matches(emailRegex, "البريد الالكتروني غير صالح")
            .required("البريد الالكتروني مطلوب"),
          password: Yup.string()
            .min(6, "كلمة السر يجب ان تكون ستة منازل على الاقل")
            .max(50, "لقد تجاوزت الحد المسموح ")
            .matches(onealpha, "على الاقل حرف واحد كبير او صغير")
            .matches(onenum, "رقم او رمز واحد على الاقل")
            .required("كلمة السر مطلوبة"),
        })}
      >
        {({ isSubmitting }) => (
          <section className="register-photo" style={{ background: "#4e73df" }}>
            <Container className="form-container">
              <Form>
                <h1 style={{ color: "rgb(0,0,0)" }}>
                  <br />
                  <strong>! مرحبا</strong>
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

                <div className="mb-3">
                  <Field
                    id="exampleInputPassword"
                    autoComplete="password"
                    htmlFor="password"
                    className="border rounded-pill form-control form-control-user"
                    type="password"
                    placeholder="كلمة السر"
                    name="password"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  render={(msg) => (
                    <div type="invalid" style={errorStyling}>
                      {"! " + msg + " *"}
                    </div>
                  )}
                />

                <div className="mb-3">
                  <div className="custom-control custom-checkbox small"></div>
                </div>
                <Reaptcha sitekey={TEST_SITE_KEY} onVerify={onVerify} />

                <button
                  className="btn btn-primary border rounded-pill d-block btn-user w-100"
                  type="submit"
                  style={loginBtnStyle}
                  disabled={isSubmitting || !capVerify}
                >
                  تسجيل الدخول
                </button>

                <hr style={{ background: "rgb(0,0,0)" }} />

                <div className="text-center">
                  <a
                    className="small"
                    style={{ color: "rgb(0,0,0)" }}
                    href="/reset-password"
                  >
                    نسيت كلمة المرور ؟
                  </a>
                </div>
              </Form>
            </Container>
          </section>
        )}
      </Formik>
    </div>
  );
};

export default Login;
