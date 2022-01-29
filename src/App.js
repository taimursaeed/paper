import { ChakraProvider, Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./features/home/home";
import Article from "./features/article/article";
import SearchedArticles from "./features/search/searchedArticles";
import Bookmarks from "./features/bookmarks/bookmarks";

function App() {
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
