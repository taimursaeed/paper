import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { Skeleton } from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setPending(false);
    });

    return () => unsubscribe();
  }, []);

  if (pending) {
    return <Skeleton height="350px" />;
  }

  return <>{currentUser ? children : <Redirect to="/" />}</>;
};
export default ProtectedRoute;
