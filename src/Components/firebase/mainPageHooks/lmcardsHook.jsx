import { useState, useEffect } from "react";
import { db } from "../firebase.Config";
import { collection, onSnapshot } from "firebase/firestore";
/*
custom hook used to get images from firestore uses useeffect hook to fetch the data 
also uses onsnapshot from firestore to update the wesite if there is any change in the swipper database
*/
export const useGetLmcardsData = () => {
  const [cards, setCards] = useState([]);
  const [header, setHeader] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "LMCardsHeader"), (snapshot) => {
        setHeader(snapshot.docs.map((doc) => doc));
      }),
    []
  );
  useEffect(
    () =>
      onSnapshot(collection(db, "LMCards"), (snapshot) => {
        setCards(snapshot.docs.map((doc) => doc));
      }),
    []
  );
  return [header, cards];
};
