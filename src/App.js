import "./App.css";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const FetchData = async () => {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      fetch("https://api.exchange.coinbase.com/products/BTC-USD/book", options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    };
    FetchData();
  }, []);

  return <div className="App">stuff</div>;
};

export default App;
