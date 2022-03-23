import {
  sendPasswordResetEmail,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  EmailAuthProvider,
  updateEmail,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../Components/firebase/firebase.Config";
import {
  query,
  getDocs,
  collection,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
//this authentication context all the magic happen here
//create context and create google provider
const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  //contains user login data
  const [currentUser, setCurrentUser] = useState(null);
  //contains user personal data
  const [dataUser, setdataUser] = useState([]);

  const navigate = useNavigate();

  //login with email and password , it first sign out the user if he is login then sign in
  const login = async (email, password) => {
    try {
      const q = query(collection(db, "AdminEmp"), where("email", "==", email));
      const querySnapshot = q ? await getDocs(q) : "";
      if (!querySnapshot.empty) {
        await signInWithEmailAndPassword(auth, email, password).then(
          querySnapshot.docs[0].data().uid === auth.currentUser?.uid
            ? navigate("/")
            : ""
        );
      } else {
        NotificationManager.error("الايميل او كلمة السر خطأ", "خطأ", 5000);
      }
    } catch (error) {
      console.error(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          NotificationManager.error("الإيميل مستخدم بالفعل", "خطأ", 5000);
          break;
        case "auth/wrong-password":
          NotificationManager.error("الايميل او كلمة السر خطأ", "خطأ", 5000);
          break;
        case "auth/user-not-found":
          NotificationManager.error("المستخدم غير مسجل", "خطأ", 5000);
          break;
        default:
          NotificationManager.error("خطأ في الخدمة", "خطأ", 5000);
          break;
      }
    }
  };

  //log out simple and easy
  const logout = () => {
    signOut(auth).then(navigate("/"));
  };
  // it will send password reset mail if the email exist in the admin database
  const resetPassword = async (email) => {
    try {
      const q = query(collection(db, "AdminEmp"), where("email", "==", email));
      const querySnapshot = q ? await getDocs(q) : "";
      if (!querySnapshot.empty) {
        await sendPasswordResetEmail(auth, email).then(
          NotificationManager.success("تم الارسال", "تم بنجاح", 5000)
        );
      }
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          NotificationManager.error("الإيميل مستخدم بالفعل", "خطأ", 5000);
          break;
        case "auth/missing-email":
          break;
        case "auth/user-not-found":
          NotificationManager.error("المستخدم غير مسجل", "خطأ", 5000);
          break;
        case "auth/popup-closed-by-user":
          NotificationManager.error("المستخدم  اغلق التسجيل", "خطأ", 5000);
          break;
        default:
          NotificationManager.error("خطأ في الخدمة", "خطأ", 5000);
          break;
      }
    }
  };
  //create account and send verification email to be verified
  const signUp = async (email, password, role) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await setDoc(doc(db, "AdminEmp", user.uid), {
        uid: user.uid,
        authProvider: "added by admin",
        email,
        role,
        isAdmin: false,
      });
      sendEmailVerification(auth.currentUser).then(() => navigate("/profile"));
    } catch (error) {
      console.error(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          NotificationManager.error("الإيميل مستخدم بالفعل", "خطأ", 5000);
          break;
        case "auth/wrong-password":
          NotificationManager.error("الايميل او كلمة السر خطأ", "خطأ", 5000);
          break;
        case "auth/user-not-found":
          NotificationManager.error("المستخدم غير مسجل", "خطأ", 5000);
          break;
        default:
          NotificationManager.error("خطأ في الخدمة", "خطأ", 5000);
          break;
      }
    }
  };

  ///hook to manage logged user data and if he is logged or not, changed if the user changed
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const q = user
        ? query(collection(db, "AdminEmp"), where("uid", "==", user?.uid))
        : "";
      const querySnapshot = q ? await getDocs(q) : "";
      !querySnapshot.empty
        ? setdataUser(querySnapshot.docs[0].data())
        : setdataUser([]);
      setCurrentUser(user);
    });
  }, []);

  const value = {
    currentUser,
    dataUser,
    login,
    logout,
    signUp,
    resetPassword,
    EmailAuthProvider,
    updateEmail,
    reauthenticateWithCredential,
  };
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;
