import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useGetUser = () => {
    const auth = getAuth();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false);
            setUser(user);
        }, (error) => {
            setLoading(false);
            setError(error); // Update error state
        });

        return () => unsubscribe();
    }, [auth]);

    return { user, loading, error };
};

export default useGetUser;
