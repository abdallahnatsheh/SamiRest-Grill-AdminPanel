import React, { useState } from "react";
import { Spinner, Button, Table, Container } from "react-bootstrap";
import AdminNavBar from "../AdminNavBar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import { useGetgalleryData } from "../firebase/mainPageHooks/mpgalleryHook";
import EditHeadersModal from "./Modals/EditHeadersModal";
import UpdateImageModal from "./Modals/UpdateImageModal";
import AddImageModal from "./Modals/AddImageModal";
import DeleteImageModal from "./Modals/DeleteImageModal";
import Header from "../AdminNavBar/Header";

const MPGalleryEdit = React.memo(function MPGalleryEdit() {
  const headingStyle = {
    fontWeight: "bold",
    marginBottom: "40px",
    color: "#d28d08",
  };
  const addButtonStyle = {
    margin: "2px",
    width: "99%",
    padding: " 8px 12px",
    marginBottom: " 5px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "5px",
  };
  //helper function to update existing image in swiper
  function makeUpdate(id) {
    setItemId(id);
    setupdateImageModalShow(true);
  }
  //helper function to delete existing image in gallery
  function makeDelete(id) {
    setItemId(id);
    setdeleteImageModalShow(true);
  }
  const [header, gallery] = useGetgalleryData();
  const [editHeadersModalShow, seteditHeadersModalShow] = useState(false);
  //show modal for adding new images
  const [addImageModalShow, setaddImageModalShow] = useState(false);
  //show modal to update existing images
  const [updateImageModalShow, setupdateImageModalShow] = useState(false);
  //show modal to delete existing images
  const [deleteImageModalShow, setdeleteImageModalShow] = useState(false);
  //to set item id for managing updates
  const [itemid, setItemId] = useState("");

  return header.length === 0 || gallery.length === 0 ? (
    <div id="wrapper">
      <AdminNavBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <Header title={"تعديل المعرض للصفحة الرئيسية"} />

        <div id="content">
          <div style={{ alignItems: "center", padding: "10px" }}>
            <h3 className="text-dark mb-0">تعديل المعرض للصفحة الرئيسية</h3>
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
            title={header[0]}
            paragraph={header[1]}
            onClick={() => seteditHeadersModalShow(true)}
          >
            Edit Headers
          </Button>
          <EditHeadersModal
            show={editHeadersModalShow}
            onHide={() => seteditHeadersModalShow(false)}
            title={header[0]}
            paragraph={header[1]}
          />

          <Button
            className="btn btn-primary"
            type="button"
            style={addButtonStyle}
            onClick={() => setaddImageModalShow(true)}
          >
            اضافة صورة
          </Button>
          <AddImageModal
            show={addImageModalShow}
            onHide={() => setaddImageModalShow(false)}
          />
          <Table>
            <thead>
              <tr>
                <th>رمز العنصر</th>
                <th>صور</th>
                <th>الخيارات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>الجدول فارغ قم باضافة صورة</td>
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
        <Header title={"تعديل المعرض للصفحة الرئيسية"} />
        <div id="content">
          <div style={{ alignItems: "center", padding: "10px" }}>
            <h3 className="text-dark mb-0">تعديل المعرض للصفحة الرئيسية</h3>
          </div>
          <Container className="container">
            <div className="intro" style={{ margin: "0 auto 40px" }}>
              <h2 className="text-center" style={headingStyle}>
                {header[0].data().title ? header[0].data().title : "معرض الصور"}
              </h2>
              <p className="text-center" style={{ color: "rgb(0,0,0)" }}>
                {header[1].data().paragraph
                  ? header[1].data().paragraph
                  : "😍هنا يمكنك رؤية كل ما هو مميز ولذيذ في مطعمنا 😍 "}
              </p>
            </div>
            <Box sx={{ width: "100%", height: "100%" }}>
              <ImageList variant="masonry" cols={5} gap={5}>
                {gallery.map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      src={`${item.data().img}?w=248&fit=crop&auto=format`}
                      srcSet={`${
                        item.data().img
                      }?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.data().title}
                      key={item.id}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Container>
          <Button
            className="btn btn-primary"
            type="button"
            style={addButtonStyle}
            title={header[0]}
            paragraph={header[1]}
            onClick={() => seteditHeadersModalShow(true)}
          >
            تعديل العناوين
          </Button>
          <EditHeadersModal
            show={editHeadersModalShow}
            onHide={() => seteditHeadersModalShow(false)}
            title={header[0]}
            paragraph={header[1]}
          />

          <Button
            className="btn btn-primary"
            type="button"
            style={addButtonStyle}
            onClick={() => setaddImageModalShow(true)}
          >
            إضافة صورة
          </Button>
          <AddImageModal
            show={addImageModalShow}
            onHide={() => setaddImageModalShow(false)}
          />
          <UpdateImageModal
            show={updateImageModalShow}
            onHide={() => setupdateImageModalShow(false)}
            imgid={itemid}
          />
          <DeleteImageModal
            show={deleteImageModalShow}
            onHide={() => setdeleteImageModalShow(false)}
            image={itemid}
          />
          <Table>
            <thead>
              <tr>
                <th>رمز العنصر</th>
                <th>صور</th>
                <th>الخيارات</th>
              </tr>
            </thead>
            <tbody>
              {!gallery ? (
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              ) : (
                gallery.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <img
                        src={`${item.data().img}?w=248&fit=crop&auto=format`}
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

export default MPGalleryEdit;
