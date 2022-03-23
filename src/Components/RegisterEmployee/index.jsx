import React from "react";
import AdminNavBar from "../AdminNavBar";
import Header from "../AdminNavBar/Header";
import { Container } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";

const errorStyling = {
  color: "rgb(0,0,0)",
};

const RegisterEmployee = () => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const onealpha = /[a-z]/i;
  const onenum = /[0-9~!@#$%^&*()_+\-={}|[\]\\:";'<>?,./]/i;
  const { signUp } = useAuth();

  return (
    <div id="wrapper">
      <AdminNavBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <Header title={"إضافة موظفين"} />
        <div id="content">
          <div style={{ alignItems: "center", padding: "10px" }}>
            <h3 className="text-dark mb-0"> إضافة موظفين</h3>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
              passwordRepeat: "",
              role: "",
            }}
            onSubmit={async (values, actions) => {
              await signUp(values.email, values.password, values.role);
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
              passwordRepeat: Yup.string()
                .oneOf([Yup.ref("password"), null], "كلمات السر ليست متطابقة")
                .min(6, "كلمة السر يجب ان تكون ستة منازل على الاقل")
                .max(50, "لقد تجاوزت الحد المسموح ")
                .required("تأكيد كلمة السر مطلوب"),
              role: Yup.string().required("اختيار الصلاحيات مطلوب"),
            })}
          >
            {({ isSubmitting, handleChange, handleBlur, values }) => (
              <section>
                <Container className="form-container">
                  <div className="image-holder"></div>
                  <Form>
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
                      <Field
                        className="border rounded-pill form-control"
                        type="password"
                        autoComplete="password"
                        name="passwordRepeat"
                        placeholder="تكرار كلمة السر"
                      />
                    </div>
                    <ErrorMessage
                      name="passwordRepeat"
                      render={(msg) => (
                        <div type="invalid" style={errorStyling}>
                          {"! " + msg + " *"}
                        </div>
                      )}
                    />

                    <div className="mb-3" name="acceptTerms">
                      <div
                        className="custom-control custom-checkbox small"
                        name="acceptTerms"
                      ></div>
                    </div>
                    <select
                      className="form-select"
                      as="select"
                      name="role"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ borderRadius: "25px" }}
                    >
                      <option value="" label="صلاحيات" />
                      <option value="admin" label="مسؤول" />
                      <option value="driver" label="عامل توصيل" />
                      <option value="recption" label="عامل الطلبات" />
                    </select>
                    <ErrorMessage
                      name="role"
                      render={(msg) => (
                        <div type="invalid" style={errorStyling}>
                          {"! " + msg + " *"}
                        </div>
                      )}
                    />
                    <br></br>
                    <button
                      className="btn btn-primary border rounded-pill d-block btn-user w-100"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      اشتراك
                    </button>
                  </Form>
                </Container>
              </section>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default RegisterEmployee;
