import React from "react";
import { Container } from "react-bootstrap";
import "./lmcards.css";

const containerStyle = {
  height: "60%",
  width: "100%",
};
const headingStyle = {
  fontWeight: "bold",
  marginBottom: "40px",
  color: "#d28d08",
};
/*
latest meals component that the admin will be able to change it from his admin panel
*/
const LMCard = (props) => {
  return (
    <Container style={containerStyle} fluid>
      <div className="intro" style={{ margin: "0 auto 40px" }}>
        <h2 className="text-center" style={headingStyle}>
          {props.title.data().title ? props.title.data().title : "جديد المطعم"}
        </h2>
        <p className="text-center" style={{ color: "rgb(0,0,0)" }}>
          {props.paragraph.data().paragraph
            ? props.paragraph.data().paragraph
            : " 🤩 هنا تجد اجدد واحدث وجبات المطعم "}
        </p>
      </div>
      <div className="main">
        <ul className="cards">
          {props.cards.map((card) => (
            <li className="cards_item" key={card.id}>
              <div className="card">
                <div className="card_image">
                  <img
                    style={{ height: "250px", width: "250" }}
                    src={card.data().img}
                    alt="card"
                  />
                </div>
                <div className="card_content">
                  <h2 className="card_title">
                    {card.data().name}
                    {card.data().deals.enabled ? (
                      <span>
                        <del style={{ fontSize: "15px" }}>
                          {card.data().price} NIS
                        </del>
                        {card.data().price -
                          (card.data().price * card.data().deals.value) / 100}
                        NIS
                      </span>
                    ) : (
                      <span>{card.data().price} NIS</span>
                    )}
                  </h2>
                  <div className="card_text">
                    <p>{card.data().info.infoF}</p>
                    <p>{card.data().info.infoS}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default LMCard;
