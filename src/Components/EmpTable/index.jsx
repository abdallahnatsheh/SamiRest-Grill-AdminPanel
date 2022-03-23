import React from "react";
import Header from "../AdminNavBar/Header";
import AdminNavBar from "../AdminNavBar";
import { Spinner, Table } from "react-bootstrap";
import { useEmpTableHook } from "./empTableHook";
const EmpTable = () => {
  const [documents] = useEmpTableHook();
  const roleing = {
    recption: "عامل توصيل",
    admin: "مسؤول",
    driver: "عامل طلبات",
  };
  return documents.length !== 0 ? (
    <div id="wrapper">
      <AdminNavBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <Header title={"جدول الموظفين"} />
        <div id="content">
          <div className="container-fluid">
            <div
              className="card shadow"
              style={{ height: "fit-content", blockSize: "fit-content" }}
            >
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">جدول الموظفين</p>
              </div>
              <div className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>الاسم</th>
                      <th>صلاحيات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((employee, index) => (
                      <tr key={employee.data().uid}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            className="rounded-circle me-2"
                            width="30"
                            height="30"
                            src={employee.data().personalImage}
                          />
                          {employee.data().firstName +
                            " " +
                            employee.data().lastName}
                        </td>
                        <td>{roleing[employee.data().role]}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default EmpTable;
