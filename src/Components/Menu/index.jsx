import React, { useState } from "react";
import AdminNavBar from "../AdminNavBar";
import MenuItem from "./MenuItem";
import { Button, Table, ButtonGroup } from "react-bootstrap";
import "./style.css";
import AddMealModal from "./Modal/AddMealModal";
import { useGetMainMenuMeals } from "../firebase/mainMenuHooks/mainMenuHook";
import UpdateMealModal from "./Modal/UpdateMealModal";
import DeleteMealModal from "./Modal/DeleteMealModal";
import Header from "../AdminNavBar/Header";
const addButtonStyle = {
  margin: "2px",
  width: "99%",
  padding: " 8px 12px",
  marginBottom: " 5px",
  marginLeft: "5px",
  marginRight: "5px",
  marginTop: "5px",
  borderRadius: "10px",
};
const Menu = () => {
  const [menuItemsData] = useGetMainMenuMeals();
  const [addMealModalShow, setaddMealModalShow] = useState(false);
  //show modal to update existing images
  const [updateMealModalShow, setupdateMealModalShow] = useState(false);
  //show modal to delete existing images
  const [deleteMealModalShow, setdeleteMealModalShow] = useState(false);
  const [previewShow, setpreviewShow] = useState(false);

  const [foodid, setFoodId] = useState("");
  //helper function to update existing meal in menu
  function makeUpdate(id) {
    setFoodId(id);
    setupdateMealModalShow(true);
  }
  //helper function to delete existing meal in menu
  function makeDelete(id) {
    setFoodId(id);
    setdeleteMealModalShow(true);
  }
  return (
    <div id="wrapper">
      <AdminNavBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <Header title={"تعديل قائمةالوجبات"} />
        <div id="content">
          <div style={{ alignItems: "center" }}>
            <h3 className="text-dark mb-0">تعديل قائمةالوجبات</h3>
          </div>
          <ButtonGroup size="lg" className="mb-2" style={addButtonStyle}>
            <Button
              className="btn btn-primary"
              type="button"
              style={addButtonStyle}
              onClick={() => setaddMealModalShow(true)}
            >
              إضافة وجبة
            </Button>
            <Button
              className="btn btn-primary"
              type="button"
              style={addButtonStyle}
              onClick={() => setpreviewShow(!previewShow)}
            >
              إظهار / إخفاء المعاينة
            </Button>
          </ButtonGroup>
          <AddMealModal
            show={addMealModalShow}
            onHide={() => setaddMealModalShow(false)}
          />
          <UpdateMealModal
            show={updateMealModalShow}
            onHide={() => setupdateMealModalShow(false)}
            item={foodid}
          />
          <DeleteMealModal
            show={deleteMealModalShow}
            onHide={() => setdeleteMealModalShow(false)}
            item={foodid}
          />
          {menuItemsData.length === 0 || !previewShow ? (
            ""
          ) : (
            <MenuItem list={menuItemsData} />
          )}
          <Table>
            <thead>
              <tr>
                <th>رمز العنصر</th>
                <td>الاسم</td>
                <th>البطتقة</th>
                <th>الخيارات</th>
              </tr>
            </thead>
            <tbody>
              {!menuItemsData ? (
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              ) : (
                menuItemsData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.data().name}</td>
                    <td>
                      <img
                        src={item.data().img}
                        key={item.id}
                        alt=""
                        style={{ width: "100px", height: "50px" }}
                      />
                    </td>
                    <td>
                      <Button
                        className="btn btn-primary"
                        type="button"
                        style={{ width: "38.6875px", margin: "3px" }}
                        key={item.id}
                        onClick={() => makeUpdate(item.id)}
                      >
                        <i className="fa fa-edit"></i>
                      </Button>

                      <Button
                        className="btn btn-primary"
                        type="button"
                        style={{ width: "38.6875px", margin: "3px" }}
                        onClick={() => makeDelete(item.id)}
                      >
                        <i className="fa fa-close"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default Menu;
