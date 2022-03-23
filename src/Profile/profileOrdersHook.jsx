import { useState, useEffect } from "react";
import { db } from "../firebase/firebase.Config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
/*
custom hook used to get main menu meals from firestore uses useeffect hook to fetch the data 
also uses onsnapshot from firestore to update the wesite if there is any change in the menu database
*/
export const useProfileOrdersHook = () => {
  const [_, setDocuments] = useState([]);
  const [row, __] = useState([]);
  const { currentUser } = useAuth();
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "orders"),
          where("dataUser.uid", "==", currentUser ? currentUser.uid : "")
        ),
        (snapshot) => {
          setDocuments(
            snapshot.docs.map((doc) => {
              row.push({
                id: doc.id,
                date: doc.data().orderDate,
                time: doc.data().orderTime,
                totalPrice: doc.data().cartTotal,
                status: doc.data().status,
                orders: doc.data().orders,
              });
            })
          );
        }
      ),
    [currentUser]
  );

  return [row];
};
