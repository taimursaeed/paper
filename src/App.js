import { ChakraProvider, Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./features/home/home";
import Article from "./features/article/article";
import SearchedArticles from "./features/search/searchedArticles";
import Bookmarks from "./features/bookmarks/bookmarks";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged called: ", user ? user.uid : user);
      dispatch(setUser(user ? user.uid : user));
    });
  }, [dispatch, auth]);


  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <Navigation/>
          <Container px="4" py="8" maxW="container.lg">
            <Switch>
              <Route path="/" exact>
                <Home/>
              </Route>
              {              //TODO: make the bookmarks components protected
              }
              <Route path="/bookmarks" exact>
                <Bookmarks/>
              </Route>
              <Route path="/search" exact>
                <SearchedArticles/>
              </Route>
              <Route path="/article/:id">
                <Article/>
              </Route>
              <Redirect to="/"/>
            </Switch>
          </Container>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
