import React, { useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import AdminNavBar from "../AdminNavBar";
import Swipper from "./Swapper";
import "./swipperedit.css";
import { useGetSwipperData } from "../firebase/mainPageHooks/swapperHook";
import AddImageModal from "./Modals/AddImageModal";
import UpdateImageModal from "./Modals/UpdateImageModal";
import DeleteImageModal from "./Modals/DeleteImageModal";
//this handle swipper image on the main page of the website with CRUD
//it contains swipper for preview
//table to show existing images and helps managing them with RUD
//button to add images
const addButtonStyle = {
  margin: "2px",
  width: "100%",
  padding: " 8px 12px",
  marginBottom: " 5px",
  marginLeft: "5px",
  marginRight: "5px",
  marginTop: "5px",
};
const SwipperEdit = React.memo(function SwipperEdit() {
  //get images from firestore
  const [documents] = useGetSwipperData();
  //show modal for adding new images
  const [addImageModalShow, setaddImageModalShow] = useState(false);
  //show modal to update existing images
  const [updateImageModalShow, setupdateImageModalShow] = useState(false);
  //show modal to delete existing images
  const [deleteImageModalShow, setdeleteImageModalShow] = useState(false);

  //to set item id for managing updates
  const [itemid, setItemId] = useState("");

  //helper function to update existing image in swiper
  function makeUpdate(id) {
    setItemId(id);
    setupdateImageModalShow(true);
  }
  //helper function to delete existing image in swiper
  function makeDelete(id) {
    setItemId(id);
    setdeleteImageModalShow(true);
  }
  return documents.length === 0 ? (
    <div id="wrapper">
      <AdminNavBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="d-sm-flex justify-content-between align-items-center mb-4">
            <h3 className="text-dark mb-0">تعديل لوحة الاعلانات</h3>
          </div>
          <Spinner
            animation="border"
            variant="primary"
            style={{ padding: "210px" }}
          />
          <Button
            className="btn btn-primary"
            type="button"
            style={addButtonStyle}
            onClick={() => setaddImageModalShow(true)}
          >
            Add Image
          </Button>
          <AddImageModal
            show={addImageModalShow}
            onHide={() => setaddImageModalShow(false)}
          />

          <Table>
            <thead>
              <tr>
                <th>رمز العنصر</th>
                <th>الصورة</th>
                <th>الخيارات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>قم باضافة صور </td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  ) : (
    <div id="wrapper">
      <AdminNavBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="d-sm-flex justify-content-between align-items-center mb-4">
            <h3 className="text-dark mb-0">تعديل لوحة الاعلانات</h3>
          </div>
          <Swipper documents={[documents]} />
          <Button
            className="btn btn-primary"
            type="button"
            style={addButtonStyle}
            onClick={() => setaddImageModalShow(true)}
          >
            Add Image
          </Button>
          <AddImageModal
            show={addImageModalShow}
            onHide={() => setaddImageModalShow(false)}
          />
          <UpdateImageModal
            show={updateImageModalShow}
            onHide={() => setupdateImageModalShow(false)}
            image={itemid}
          />
          <DeleteImageModal
            show={deleteImageModalShow}
            onHide={() => setdeleteImageModalShow(false)}
            image={itemid}
          />
          <Table>
            <thead>
              <tr>
                <th>رمز التعريف</th>
                <th>الصورة</th>
                <th>الخيارات</th>
              </tr>
            </thead>
            <tbody>
              {!documents ? (
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              ) : (
                documents.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <img
                        src={item.data().image}
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
});

export default SwipperEdit;
