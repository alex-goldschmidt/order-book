import { useState, useEffect } from "react";
import styles from "./bid.module.css";

const BestBid = () => {
  const [selectedBid, setSelectedBid] = useState("BTC-USD");
  const [BidPrice, setBidPrice] = useState("");
  const [BidQuantity, setBidQuantity] = useState("");

  const handleChange = (e) => {
    setSelectedBid(e.target.value);
  };

  useEffect(
    () => {
      const FetchBids = async () => {
        const options = {
          method: "GET",
          headers: { accept: "application/json" },
        };

        const GetData = await fetch(
          `https://api.exchange.coinbase.com/products/${selectedBid}/book`,
          options
        );
        const BidData = await GetData.json();
        console.log(BidData);
        setBidPrice(BidData.bids[0][0]); //Price
        setBidQuantity(BidData.bids[0][1]); //Quantity
      };
      FetchBids();
    },
    [selectedBid],
    [BidQuantity]
  );

  return (
    <div className={styles.BidContainer}>
      Best Bid for
      <select value={selectedBid} onChange={handleChange}>
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
