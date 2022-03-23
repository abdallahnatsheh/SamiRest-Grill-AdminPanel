import React, { useState ,memo} from "react";
import AdminNavBar from "../AdminNavBar";
import Header from "../AdminNavBar/Header";
import { useProfileOrdersHook } from "./ordersHook";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import {
  Col,
  Container,
  Row,
  Spinner,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import ChangeStateModal from "./ChangeStateModal";
import { useProfileSpecialOrdersHook } from "./specialOrdersHook";

const Orders = function Orders() {
  const [orders] = useProfileOrdersHook();
  const [specialOrders] = useProfileSpecialOrdersHook();
  const [ChangeStateModalShow, setChangeStateModalShow] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orderType, setorderType] = useState(0);

  const columns = [
    { dataField: "id", text: "رمز تعريفي", sort: true, filter: textFilter() },
    { dataField: "date", text: "تاريخ الطلب", sort: true },
    { dataField: "time", text: "وقت الطلب", sort: true },
    { dataField: "totalPrice", text: "₪ السعر كاملا ", sort: true },
    { dataField: "status", text: "حالة الطلب", sort: true },
  ];
  const SOcolumns = [
    { dataField: "id", text: "رمز تعريفي", sort: true, filter: textFilter() },
    { dataField: "date", text: "تاريخ الطلب", sort: true },
    { dataField: "time", text: "وقت الطلب", sort: true },
    { dataField: "status", text: "حالة الطلب", sort: true },
  ];
  const radios = [
    { name: "وضع الانتظار", value: "وضع الانتظار" },
    { name: "قيد الطبخ", value: "قيد الطبخ" },
    { name: "قيد التوصيل", value: "قيد التوصيل" },
  ];
  const handleChangeStatus = (status, orderId, type) => {
    setOrderStatus(status);
    setOrderId(orderId);
    setorderType(type);
    setChangeStateModalShow(true);
  };
  const expandRow = {
    onlyOneExpanding: true,
    renderer: (row) => (
      <Container fluid>
        <Row style={{ fontSize: "17px" }}>
          <Col>
            <div style={{ textAlign: "right", fontWeight: "bold" }}>
              :الزبون
            </div>
            <div>
              الإسم : {row.userData.firstName + " " + row.userData.lastName}
            </div>
            <div>رقم الهاتف : {row.userData.phoneNumber}</div>
            <div>
              العنوان :
              {row.userData.firstAddress + "," + row.userData.secondAddress}
            </div>
            <div> {row.userData.email} : البريد الالكتروني</div>
          </Col>
          <Col>
            <div style={{ textAlign: "right", fontWeight: "bold" }}>:الطلب</div>
            <div className="grid">{row.id} : الرقم التعريفي</div>
            {row.orders.map((order, index) => (
              <div key={index}>
                <div> اسم الطلب : {order.name} </div>
                <div>
                  ({order.types.value} nis) نوع الطلب :{order.types.name}
                </div>
                <div>
                  {order.addons.length !== 0 ? (
                    <div>
                      الاضافات: {order.addons.map((addon) => addon.name + ",")}
                    </div>
                  ) : (
                    "بدون اضافات"
                  )}
                </div>
                <div>عدد : {order.quantity}</div>
                <div>
                  {row.notes ? (
                    <div style={{ fontWeight: "bold" }}>
                      ملاحظات :{row.notes}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div style={{ fontWeight: "bold" }}>
                  السعر الكلي : {order.totalPrice}
                </div>
              </div>
            ))}
          </Col>
        </Row>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}-1`}
              type="radio"
              variant={
                radio.value === "قيد التوصيل"
                  ? "outline-success"
                  : radio.value === "وضع الانتظار"
                  ? "outline-danger"
                  : "outline-warning"
              }
              name="radio1"
              value={radio.value}
              checked={row.status === radio.value}
              onChange={(e) =>
                handleChangeStatus(e.currentTarget.value, row.id, 1)
              }
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Container>
    ),
  };
  const specialExpandRow = {
    onlyOneExpanding: true,
    renderer: (row) => (
      <Container fluid>
        <Row style={{ fontSize: "17px" }}>
          <Col>
            <div style={{ textAlign: "right", fontWeight: "bold" }}>
              :الزبون
            </div>
            <div>
              الإسم : {row.userData.firstName + " " + row.userData.lastName}
            </div>
            <div>رقم الهاتف : {row.userData.phoneNumber}</div>
            <div>
              العنوان :
              {row.userData.firstAddress + "," + row.userData.secondAddress}
            </div>
            <div> {row.userData.email} : البريد الالكتروني</div>
          </Col>
          <Col>
            <div style={{ textAlign: "right", fontWeight: "bold" }}>:الطلب</div>
            <div className="grid">{row.id} : الرقم التعريفي</div>
            <div className="grid">اسم الطلب : {row.orders.name} </div>
            <div className="grid">
              معلومات الطلب : {row.orders.describtion}{" "}
            </div>
            <div className="grid" style={{ fontWeight: "bold" }}>
              كمية الطلب : {row.orders.quantity}{" "}
            </div>
          </Col>
        </Row>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}-2`}
              type="radio"
              variant={
                radio.value === "قيد التوصيل"
                  ? "outline-success"
                  : radio.value === "وضع الانتظار"
                  ? "outline-danger"
                  : "outline-warning"
              }
              name="radio2"
              value={radio.value}
              checked={row.status === radio.value}
              onChange={(e) =>
                handleChangeStatus(e.currentTarget.value, row.id, 2)
              }
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Container>
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
      <ChangeStateModal
        show={ChangeStateModalShow}
        onHide={() => setChangeStateModalShow(false)}
        orderstatus={orderStatus}
        orderid={orderId}
        ordertype={orderType}
      />
      <AdminNavBar />

      <div id="content-wrapper" className="d-flex flex-column">
        <Header title={"الطلبات"} />
        <div id="content">
          <div style={{ alignItems: "center", padding: "10px" }}>
            <h3 className="text-dark mb-0">الطلبات العامة</h3>
          </div>
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
          <div style={{ alignItems: "center", padding: "10px" }}>
            <h3 className="text-dark mb-0">الطلبات الخاصة</h3>
          </div>
          <div id="content">
            {specialOrders ? (
              <BootstrapTable
                keyField="id"
                bootstrap4
                data={specialOrders}
                columns={SOcolumns}
                striped
                hover
                condensed
                pagination={paginationFactory()}
                expandRow={specialExpandRow}
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
    </div>
  );
};
export default memo(Orders);
