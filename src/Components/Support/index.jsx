import React, { memo } from "react";
import { Accordion, Container, Spinner } from "react-bootstrap";
import AdminNavBar from "../AdminNavBar";
import Header from "../AdminNavBar/Header";
import { useSupportHook } from "./useSupportHook";

const Support = function Support() {
  const [documents, docLen] = useSupportHook();
  return docLen !== 0 ? (
    <div id="wrapper">
      <AdminNavBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <Header title={"الدعم الفني"} />
        <div id="content">
          <div style={{ alignItems: "center", padding: "10px" }}>
            <h3 className="text-dark mb-0">الدعم الفني</h3>
          </div>
          <Container>
            <Accordion defaultActiveKey={["0"]} alwaysOpen dir="rtl">
              {documents.map((doc, index) => (
                <Accordion.Item eventKey={index} key={index}>
                  <Accordion.Header>مشكلة رقم {index + 1}</Accordion.Header>
                  <Accordion.Body>
                    <div>الاسم : {doc.data().name}</div>
                    <div>بريد الالكتروني : {doc.data().email}</div>
                    <div>رقم الهاتف : {doc.data().phone}</div>
                    <div>وصف المشكلة : {doc.data().describtion}</div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Container>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};
export default memo(Support);
