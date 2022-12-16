import "./App.css";
import BestBid from "./components/Bid";
import BestAsk from "./components/Ask";
import PriceChart from "./components/Chart";
import Ladder from "./components/Ladder";
import { useState, useRef, useEffect } from "react";
import React from "react";

const App = () => {
  const [selectedBidCurrency, setSelectedBidCurrency] = useState("BTC-USD");
  const [previousBidCurrency, setPreviousBidCurrency] = useState(null);
  const [BidPrice, setBidPrice] = useState("");
  const [BidQuantity, setBidQuantity] = useState("");
  const wsBid = useRef(null);

  const handleBidCurrencyChange = React.useCallback(
    (e) => {
      setPreviousBidCurrency(selectedBidCurrency);
      setSelectedBidCurrency(e.target.value);
    },
    [selectedBidCurrency]
  );

  useEffect(
    () => {
      if (wsBid.current) {
        // unsubscribe from the previous currency
        let msg = {
          type: "unsubscribe",
          product_ids: [previousBidCurrency],
          channels: ["ticker"],
        };
        let jsonMsg = JSON.stringify(msg);
        wsBid.current.send(jsonMsg);
        console.log(jsonMsg);
      }

      wsBid.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
      wsBid.current.onopen = () => {
        let msg = {
          type: "subscribe",
          product_ids: [selectedBidCurrency],
          channels: ["ticker"],
        };
        let jsonMsg = JSON.stringify(msg);
        wsBid.current.send(jsonMsg);
        console.log(jsonMsg);
      };

      wsBid.current.onmessage = (e) => {
        let data = JSON.parse(e.data);
        if (data.type !== "ticker") {
          return;
        }
        if (data.product_id === selectedBidCurrency) {
          setBidPrice(data.best_bid);
          setBidQuantity(data.best_bid_size);
        }
      };

      //dependency array is passed currency state, will run on any currency state change
    },
    [previousBidCurrency, selectedBidCurrency],
    [BidPrice],
    [BidQuantity]
  );

  const [selectedAskCurrency, setSelectedAskCurrency] = useState("BTC-USD");
  const [previousAskCurrency, setPreviousAskCurrency] = useState(null);
  const [AskPrice, setAskPrice] = useState("");
  const [AskQuantity, setAskQuantity] = useState("");
  const wsAsk = useRef(null);

  const handleAskCurrencyChange = React.useCallback(
    (e) => {
      setPreviousAskCurrency(selectedAskCurrency);
      setSelectedAskCurrency(e.target.value);
    },
    [selectedAskCurrency]
  );

  useEffect(
    () => {
      if (wsAsk.current) {
        // unsubscribe from the previous currency
        let msg = {
          type: "unsubscribe",
          product_ids: [previousAskCurrency],
          channels: ["ticker"],
        };
        let jsonMsg = JSON.stringify(msg);
        wsAsk.current.send(jsonMsg);
        console.log(jsonMsg);
      }

      wsAsk.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
      wsAsk.current.onopen = () => {
        let msg = {
          type: "subscribe",
          product_ids: [selectedAskCurrency],
          channels: ["ticker"],
        };
        let jsonMsg = JSON.stringify(msg);
        wsAsk.current.send(jsonMsg);
        console.log(jsonMsg);
      };

      wsAsk.current.onmessage = (e) => {
        let data = JSON.parse(e.data);
        if (data.type !== "ticker") {
          return;
        }
        if (data.product_id === selectedAskCurrency) {
          setAskPrice(data.best_ask);
          setAskQuantity(data.best_ask_size);
        }
      };

      //dependency array is passed currency state, will run on any currency state change
    },
    [previousAskCurrency, selectedAskCurrency],
    [AskPrice],
    [AskQuantity]
  );

  return (
    <div className="App">
      <div className="BidAskContainer">
        <BestBid
          onChange={handleBidCurrencyChange}
          selectedBidCurrency={selectedBidCurrency}
          previousBidCurrency={previousBidCurrency}
          BidPrice={BidPrice}
          BidQuantity={BidQuantity}
        />
        <BestAsk
          onChange={handleAskCurrencyChange}
          selectedAskCurrency={selectedAskCurrency}
          previousAskCurrency={previousAskCurrency}
          AskPrice={AskPrice}
          AskQuantity={AskQuantity}
        />
      </div>
      <div className="chartContainer">
        <PriceChart BidPrice={BidPrice} AskPrice={AskPrice} />
      </div>
      <Ladder
        BidPrice={BidPrice}
        BidQuantity={BidQuantity}
        AskPrice={AskPrice}
        AskQuantity={AskQuantity}
        selectedBidCurrency={selectedBidCurrency}
        selectedAskCurrency={selectedAskCurrency}
      />
    </div>
  );
};

export default App;
