import { useState, useEffect, useRef } from "react";
import styles from "./bid.module.css";

const BestBid = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("BTC-USD");
  const [previousCurrency, setPreviousCurrency] = useState(null);
  const [BidPrice, setBidPrice] = useState("");
  const [BidQuantity, setBidQuantity] = useState("");
  const ws = useRef(null);

  const handleCurrencyChange = (e) => {
    setPreviousCurrency(selectedCurrency);
    setSelectedCurrency(e.target.value);
  };

  useEffect(
    () => {
      if (ws.current) {
        // unsubscribe from the previous currency
        let msg = {
          type: "unsubscribe",
          product_ids: [previousCurrency],
          channels: ["ticker"],
        };
        let jsonMsg = JSON.stringify(msg);
        ws.current.send(jsonMsg);
        console.log(jsonMsg);
      }

      ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
      ws.current.onopen = () => {
        let msg = {
          type: "subscribe",
          product_ids: [selectedCurrency],
          channels: ["ticker"],
        };
        let jsonMsg = JSON.stringify(msg);
        ws.current.send(jsonMsg);
        console.log(jsonMsg);
      };

      ws.current.onmessage = (e) => {
        let data = JSON.parse(e.data);
        if (data.type !== "ticker") {
          return;
        }
        if (data.product_id === selectedCurrency) {
          setBidPrice(data.best_bid);
          setBidQuantity(data.best_bid_size);
        }
      };

      //dependency array is passed currency state, will run on any currency state change
    },
    [previousCurrency, selectedCurrency],
    [BidPrice],
    [BidQuantity]
  );

  return (
    <div className={styles.BidContainer}>
      Best Bid for
      <select value={selectedCurrency} onChange={handleCurrencyChange}>
        <option value="BTC-USD">BTC-USD</option>
        <option value="ETH-USD">ETH-USD</option>
        <option value="LTC-USD">LTC-USD</option>
        <option value="BCH-USD">BCH-USD</option>
      </select>
      <div className={styles.PriceQuantityContainer}>
        <div className={styles.price}>
          <p>{BidPrice}</p>Bid Price
        </div>
        <div className={styles.quantity}>
          <p>{BidQuantity}</p>Bid Quantity
        </div>
      </div>
    </div>
  );
};

export default BestBid;
