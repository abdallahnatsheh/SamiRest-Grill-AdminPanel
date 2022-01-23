import React, { useState } from "react";
import { Spinner, Button, Table } from "react-bootstrap";
import AdminNavBar from "../AdminNavBar";
import { useGetLmcardsData } from "../firebase/mainPageHooks/lmcardsHook";
import LMCard from "./LMCards";
import AddCardsModal from "./Modals/AddCardsModal";
import DeleteCardModal from "./Modals/DeleteCardModal";
import EditHeadersModal from "./Modals/EditHeadersModal";
import UpdateCardsModal from "./Modals/UpdateCardModal";
const addButtonStyle = {
  margin: "2px",
  width: "99%",
  padding: " 8px 12px",
  marginBottom: " 5px",
  marginLeft: "5px",
  marginRight: "5px",
  marginTop: "5px",
};
const LMCardsEdit = () => {
  const [header, cards] = useGetLmcardsData();
  const [editHeadersModalShow, seteditHeadersModalShow] = useState(false);
  const [addCardsModalShow, setaddCardsModal] = useState(false);
  //show modal to update existing images
  const [updateCardModalShow, setupdateCardModalShow] = useState(false);
  //show modal to delete existing images
  const [deleteCardModalShow, setdeleteCardModalShow] = useState(false);
  //to set item id for managing updates
  const [cardid, setCardId] = useState("");
  //helper function to update existing image in swiper
  function makeUpdate(id) {
    setCardId(id);
    setupdateCardModalShow(true);
  }
  //helper function to delete existing image in swiper
  function makeDelete(id) {
    setCardId(id);
    setdeleteCardModalShow(true);
  }
  return header.length === 0 || cards.length === 0 ? (
    <div id="wrapper">
      <AdminNavBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="d-sm-flex justify-content-between align-items-center mb-4">
            <h3 className="text-dark mb-0">Latest Meals-editor</h3>
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
            onClick={() => setaddCardsModal(true)}
          >
            Add Card
          </Button>
          <AddCardsModal
            show={addCardsModalShow}
            onHide={() => setaddCardsModal(false)}
            cards={cards}
          />
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <td>name</td>
                <th>card</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Add Cards Its Empty</td>
                <td>...</td>
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
            <h3 className="text-dark mb-0">Latest Meals-editor</h3>
          </div>
          <LMCard title={header[0]} paragraph={header[1]} cards={cards} />
        </div>
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
          onClick={() => setaddCardsModal(true)}
        >
          Add Card
        </Button>
        <AddCardsModal
          show={addCardsModalShow}
          onHide={() => setaddCardsModal(false)}
          cards={cards}
        />
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>card</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {!cards ? (
              <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
            ) : (
              cards.map((card) => (
                <tr key={card.id}>
                  <td>{card.id}</td>
                  <td>{card.data().name}</td>
                  <td>
                    <img
                      src={card.data().img}
                      key={card.id}
                      alt=""
                      style={{ width: "100px", height: "50px" }}
                    />
                  </td>
                  <td>
                    <Button
                      className="btn btn-primary"
                      type="button"
                      style={{ width: "38.6875px", margin: "3px" }}
                      key={card.id}
                      onClick={() => makeUpdate(card.id)}
                      disabled
                    >
                      <i className="fa fa-edit"></i>
                    </Button>
                    <UpdateCardsModal
                      show={updateCardModalShow}
                      onHide={() => setupdateCardModalShow(false)}
                      cardid={cardid}
                    />
                    <Button
                      className="btn btn-primary"
                      type="button"
                      style={{ width: "38.6875px", margin: "3px" }}
                      onClick={() => makeDelete(card.id)}
                    >
                      <i className="fa fa-close"></i>
                    </Button>
                    <DeleteCardModal
                      show={deleteCardModalShow}
                      onHide={() => setdeleteCardModalShow(false)}
                      card={cardid}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default LMCardsEdit;
