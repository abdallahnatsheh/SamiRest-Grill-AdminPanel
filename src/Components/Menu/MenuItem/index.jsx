import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import ShowItemModal from "../Modal/showItemModal";
import "./styles.css";

/**
 * this component build the item shape with picture , name , price,add product component
 * and dispatch actions with redux.
 */
const MenuItem = (props) => {
  function showItem(item) {
    setFood(item);
    setshowItemModal(true);
  }
  const [food, setFood] = useState({
    id: 0,
    name: "",
    info: "",
    catagure: "",
    price: {
      defaultPrice: {
        enabled: false,
        value: 0,
      },
      types: {
        1: { name: "", value: 0 },
      },
      addons: {
        1: { name: "", value: 0 },
      },
    },
    img: "",
    deals: {
      enabled: true,
      value: 0,
    },
  });
  const [showItemModal, setshowItemModal] = useState(false);

  return (
    <main>
      <ShowItemModal
        show={showItemModal}
        onHide={() => setshowItemModal(false)}
        item={food}
      />
      {props.list.map((item) => (
        <div
          className="item menuItems"
          key={item.id}
          onClick={() => showItem(item)}
        >
          <img id="menuImages" src={item.data().img} alt="food" />
          <div className="item-head_desc">
            <p className="head_desc-name" style={{ textAlign: "center" }}>
              {item.data().name}
            </p>
          </div>
          {item.data().deals.enabled ? (
            <div>
              <Badge
                pill
                bg="warning"
                text="dark"
                className="item-food-discount "
              >
                <small> %{item.data().deals.value} :خصم</small>
                <br />
                <del> {item.data().price.defaultPrice.value} NIS</del>
              </Badge>
              <div className="item-foot_desc">
                <span className="foot_desc-price">
                  {item.data().price.defaultPrice.value -
                    (item.data().price.defaultPrice.value *
                      item.data().deals.value) /
                      100}{" "}
                  NIS
                </span>
              </div>
            </div>
          ) : (
            <div className="item-foot_desc">
              <span className="foot_desc-price">
                {item.data().price.defaultPrice.value} NIS
              </span>
            </div>
          )}
        </div>
      ))}
    </main>
  );
};

export default MenuItem;
