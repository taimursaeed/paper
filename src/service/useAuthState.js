import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthState = () => {
    const auth = getAuth();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false);
            setUser(user);
        }, (error) => {
            setLoading(false);
            setError(error); 
        });

        return () => unsubscribe();
    }, [auth]);

    return { user, loading, error };
};

export default useAuthState;
