import { ChakraProvider, Container } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./features/home/home";
import Article from "./features/article/article";
import SearchedArticles from "./features/search/searchedArticles";
import Bookmarks from "./features/bookmarks/bookmarks";
import useAuthState from "./service/useAuthState";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "./service/firebase";
import {
  setBookmarks,
  fetchBookmarkArticles,
} from "./features/bookmarks/bookmarksSlice";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useAuthState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      (async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          dispatch(setBookmarks(userData.bookmarks));
          dispatch(fetchBookmarkArticles());
        }
      })();
    }
  }, [user, dispatch]);
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Container px="4" py="8" maxW="container.lg">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/bookmarks">
                <ProtectedRoute>
                  <Bookmarks />
                </ProtectedRoute>
              </Route>
              <Route path="/search" exact>
                <SearchedArticles />
              </Route>
              <Route path="/article/:id">
                <Article />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Container>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
