import { useState, useEffect } from "react";
import { db } from "../firebase/firebase.Config";
import { collection, onSnapshot } from "firebase/firestore";
/*
custom hook used to get images from firestore uses useeffect hook to fetch the data 
also uses onsnapshot from firestore to update the wesite if there is any change in the swipper database
*/
export const useEmpTableHook = () => {
  const [documents, setDocuments] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "AdminEmp"), (snapshot) => {
        setDocuments(snapshot.docs.map((doc) => doc));
      }),
    []
  );
  return [documents];
};
