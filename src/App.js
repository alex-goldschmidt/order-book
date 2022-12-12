import "./App.css";
import BestBid from "./components/Bid";
import BestAsk from "./components/Ask";

const App = () => {
  return (
    <div className="App">
      <BestBid />
      <BestAsk />
    </div>
  );
};

export default App;
