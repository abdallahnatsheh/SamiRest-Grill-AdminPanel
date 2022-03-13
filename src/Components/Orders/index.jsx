import React from "react";
import AdminNavBar from "../AdminNavBar";
import Header from "../AdminNavBar/Header";
import { useProfileOrdersHook } from "./ordersHook";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { Spinner } from "react-bootstrap";
import { memo } from "react";

const Orders = function Orders() {
  const [orders] = useProfileOrdersHook();

  const columns = [
    { dataField: "date", text: "تاريخ الطلب", sort: true },
    { dataField: "time", text: "وقت الطلب", sort: true },
    { dataField: "totalPrice", text: "₪ السعر كاملا ", sort: true },
    { dataField: "status", text: "حالة الطلب", sort: true },
  ];
  const expandRow = {
    onlyOneExpanding: true,
    renderer: (row) => (
      <div>
        <div>
          <div>order id: {row.id}</div>
          {row.orders.map((order, index) => (
            <div key={index}>
              <div>name: {order.name}</div>
              <div>quantity: {order.quantity}</div>
              <div>total price :{order.totalPrice}</div>
              <div>
                type : name: {order.types.name},value: {order.types.value} nis
              </div>
              <div>
                {order.addons
                  ? order.addons.map((addon, index) => (
                      <div key={index}>
                        addon {index}: {addon.name}
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          ))}
          <div>{row.notes ? <div>notes :{row.notes}</div> : ""}</div>
        </div>
        <br />
        <div>first name: {row.userData.firstName}</div>
        <div>last name: {row.userData.lastName}</div>
        <div>phone number: {row.userData.phoneNumber}</div>
        <div>address1: {row.userData.firstAddress}</div>
        <div>address2:{row.userData.secondAddress}</div>
        <div>email: {row.userData.email}</div>
      </div>
    ),
  };
  const defaultSorted = [
    {
      dataField: "date",
      dataField: "time",
      order: "desc",
    },
  ];
  return (
    <div id="wrapper">
      <AdminNavBar />

      <div id="content-wrapper" className="d-flex flex-column">
        <Header title={"الطلبات"} />
        <div id="content">
          {orders ? (
            <BootstrapTable
              keyField="id"
              bootstrap4
              data={orders}
              columns={columns}
              striped
              hover
              condensed
              pagination={paginationFactory()}
              expandRow={expandRow}
              defaultSortDirection="asc"
              noDataIndication="جدول طلباتك فارغ"
              filter={filterFactory()}
              bordered={false}
              defaultSorted={defaultSorted}
            />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(Orders);
