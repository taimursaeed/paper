import React from "react";
import { Box, Button, useToast } from "@chakra-ui/react";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut
} from "firebase/auth";
import db from "./../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { selectUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetBookmarks } from "../features/bookmarks/bookmarksSlice";

const GoogleLogo = () => {
  return (
    <Box width="20px" ml="2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" style={{ width: "100%" }}>
        <path fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
      </svg>
    </Box>
  );
};


function SignInButton() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const toast = useToast();
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();


  const checkRoute = () => {
    const currentLocation = history.location.pathname.toLowerCase();
    if (currentLocation.includes("/bookmarks")) {
      history.push("/");
    }
  };

  const logout = () => {
    if (user) {
      signOut(auth).then(() => {
        toast({
          description: "Logged out successfully.",
          status: "success",
          duration: 1000,
          position: "bottom-right"
        });

        dispatch(resetBookmarks());
        checkRoute();
      }).catch((error) => {
        console.log("Error logging out: ", error);
        toast({
          description: "There was an issue logging out.",
          status: "error",
          duration: 1000,
          position: "bottom-right"
        });
      });
    }
  };

  const login = () => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      return signInWithPopup(auth, provider)
        .then((result) => {
          // (async () => {
          //   const docRef = doc(db, "users", result.user.uid);
          //   const docSnap = await getDoc(docRef);
          //
          //   if (docSnap.exists()) {
          //     console.log("Document data:", docSnap.data());
          //   } else {
          //     // doc.data() will be undefined in this case
          //     console.log("No such document!");
          //   }
          // })();


          toast({
            description: "Logged in successfully.",
            status: "success",
            duration: 1000,
            position: "bottom-right"
          });
        }).catch((error) => {
          console.log("Error logging in: ", error);
          toast({
            description: "There was an issue logging in.",
            status: "error",
            duration: 1000,
            position: "bottom-right"
          });
        });

    }).catch(() => console.error("Error setting up auth persistence"));

  };
  return (
    <div>
      <Button onClick={user ? logout : login}>
        Log {user ? "Out" : "In"}
        {!user && <GoogleLogo/>}
      </Button>
    </div>
  );
}

export default SignInButton;
