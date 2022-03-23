import { useState, useEffect } from "react";
import { db } from "../firebase/firebase.Config";
import { collection, onSnapshot } from "firebase/firestore";
/*
custom hook used to get main menu meals from firestore uses useeffect hook to fetch the data 
also uses onsnapshot from firestore to update the wesite if there is any change in the menu database
*/
export const useSupportHook = () => {
  const [documents, setDocuments] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "cSupport"), (snapshot) => {
        setDocuments(snapshot.docs.map((doc) => doc));
      }),
    []
  );
  return [documents, documents.length];
};
