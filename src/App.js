import { ChakraProvider, Container } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./features/home/home";
import Article from "./features/article/article";
import Footer from "./components/footer";
function App() {
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
              <Route path="/:id">
                <Article />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Container>
          {/* <Footer /> */}
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
