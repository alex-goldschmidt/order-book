import { useState, useEffect } from "react";
import styles from "./ask.module.css";

const BestAsk = () => {
  const [selectedAsk, setSelectedAsk] = useState("BTC-USD");
  const [AskPrice, setAskPrice] = useState("");
  const [AskQuantity, setAskQuantity] = useState("");

  const handleChange = (e) => {
    setSelectedAsk(e.target.value);
  };

  useEffect(
    () => {
      const FetchAsks = async () => {
        const options = {
          method: "GET",
          headers: { accept: "application/json" },
        };

        const GetData = await fetch(
          `https://api.exchange.coinbase.com/products/${selectedAsk}/book`,
          options
        );
        const AskData = await GetData.json();
        console.log(AskData);
        setAskPrice(AskData.asks[0][0]); //Price
        setAskQuantity(AskData.asks[0][1]); //Quantity
      };
      FetchAsks();
    },
    [selectedAsk],
    [AskQuantity]
  );

  return (
    <div className={styles.BidContainer}>
      Best Bid for
      <select value={selectedAsk} onChange={handleChange}>
        <option value="BTC-USD">BTC-USD</option>
        <option value="ETH-USD">ETH-USD</option>
        <option value="LTC-USD">LTC-USD</option>
        <option value="BCH-USD">BCH-USD</option>
      </select>
      <div className={styles.PriceQuantityContainer}>
        <div className={styles.price}>
          <p>{AskPrice}</p>Ask Price
        </div>
        <div className={styles.quantity}>
          <p>{AskQuantity}</p>Ask Quantity
        </div>
      </div>
    </div>
  );
};

export default BestAsk;
