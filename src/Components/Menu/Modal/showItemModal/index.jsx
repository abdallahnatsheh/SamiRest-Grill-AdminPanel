import { useState } from "react";
import { Button, Card, Modal, Badge, Form } from "react-bootstrap";

import "./style.css";
const ShowItemModal = (props) => {
  const { img, name, price, info, deals } =
    props.item.id !== 0 ? props.item.data() : props.item;
  const [foodTypeValue, setFoodTypeValue] = useState([]);
  let sum = foodTypeValue.reduce((a, b) => Number(a) + Number(b), 0);
  let finalprice = deals.enabled ? sum - (sum * deals.value) / 100 : sum;
  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...foodTypeValue];
    if (!foodTypeValue.includes(event.target.value)) {
      updatedList = [...foodTypeValue, event.target.value];
    } else {
      updatedList.splice(foodTypeValue.indexOf(event.target.value), 1);
    }
    setFoodTypeValue(updatedList);
  };
  return (
    <Modal
      {...props}
      contentClassName="meal-modal"
      scrollable
      centered
      onExited={(e) => setFoodTypeValue([])}
    >
      <Modal.Body id={props.item.id}>
        <Card className="item-modal" border="light">
          <Card.Img className="card-meal-image" variant="top" src={img} />
          <Card.Body>
            <Card.Text className="meal-modal-text">
              <Badge bg="warning">
                {deals.enabled ? deals.value + "%" : ""}
              </Badge>{" "}
              {name}
            </Card.Text>
            <Card.Text>{info}</Card.Text>
            <Form dir="rtl" id="type-form">
              {!price.defaultPrice.enabled ? (
                <div className="mb-3" dir="rtl">
                  <span style={{ color: "black" }}>إختر نوعية الوجبة :</span>
                  {Object.keys(price.types).map((type) => (
                    <Form.Check
                      key={type}
                      label={
                        price.types[type].name +
                        " ₪" +
                        price.types[type].value +
                        " "
                      }
                      value={price.types[type].value}
                      id={type}
                      onChange={handleCheck}
                      type="checkbox"
                      dir="rtl"
                      style={{ margin: "10px" }}
                    />
                  ))}
                </div>
              ) : (
                <Form.Check
                  key={props.item.id}
                  label={name + " ₪" + price.defaultPrice.value + " "}
                  value={price.defaultPrice.value}
                  id={props.item.id}
                  onChange={handleCheck}
                  type="checkbox"
                  dir="rtl"
                  style={{ margin: "10px" }}
                />
              )}
              {Object.keys(price.addons).length > 0 ? (
                <div className="mb-3" dir="rtl">
                  <span style={{ color: "black" }}>إختر الاضافة للوجبة :</span>
                  {Object.keys(price.addons).map((type) => (
                    <Form.Check
                      key={type}
                      label={
                        price.addons[type].name +
                        " ₪" +
                        price.addons[type].value +
                        " "
                      }
                      value={price.addons[type].value}
                      id={type}
                      onChange={handleCheck}
                      type="checkbox"
                      dir="rtl"
                      style={{ margin: "10px" }}
                    />
                  ))}
                </div>
              ) : (
                ""
              )}
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>اغلاق</Button>
        <Button type="submit">
          {finalprice !== 0 ? "₪" + finalprice + " أضافة للسلة" : "إختر وجبتك"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowItemModal;
