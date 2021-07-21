import Navigation from "./components/Navigation";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Navigation />
      </div>
    </ChakraProvider>
  );
}

export default App;
