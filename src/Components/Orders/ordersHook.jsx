import { useState, useEffect } from "react";
import { db } from "../firebase/firebase.Config";
import { collection, onSnapshot, getDoc, doc } from "firebase/firestore";
/*
custom hook used to get main menu meals from firestore uses useeffect hook to fetch the data 
also uses onsnapshot from firestore to update the wesite if there is any change in the menu database
*/
export const useProfileOrdersHook = () => {
  const [documents, setDocuments] = useState([]);
  const [row, setRow] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const updatedOrder = [...row];

    onSnapshot(collection(db, "orders"), (snapshot) => {
      setDocuments(
        snapshot.docs.map((document) => {
          let temp = {
            id: document.id,
            date: document.data().orderDate,
            time: document.data().orderTime,
            totalPrice: document.data().cartTotal,
            status: document.data().status,
            orders: document.data().orders,
            notes: document.data().notes,
            userData: document.data().dataUser,
          };
          const updatedItemIndex = updatedOrder.findIndex(
            (item) => item.id === temp.id
          );

          if (updatedItemIndex < 0) {
            updatedOrder.push(temp);
          } else {
            const updatedItem = {
              ...updatedOrder[updatedItemIndex],
            };
            updatedOrder[updatedItemIndex] = updatedItem;
          }
          setRow(updatedOrder);
        })
      );
    });
  }, []);

  return [row];
};
