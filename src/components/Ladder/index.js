import styles from "./ladder.module.css";
import { useEffect, useState } from "react";

const Ladder = (props) => {
  const {
    BidPrice,
    AskPrice,
    selectedBidCurrency,
    selectedAskCurrency,
    BidQuantity,
    AskQuantity,
  } = props;

  const [BidPriceData, setBidPriceData] = useState([]);
  useEffect(() => {
    setBidPriceData((prevBidPriceData) => [...prevBidPriceData, BidPrice]);
  }, [BidPrice]);
  const recentBidPriceData = BidPriceData.slice(-7);

  const [BidQuantityData, setBidQuantityData] = useState([]);
  useEffect(() => {
    setBidQuantityData((prevBidQuantityData) => [
      ...prevBidQuantityData,
      BidQuantity,
    ]);
  }, [BidQuantity]);
  const recentBidQuantityData = BidQuantityData.slice(-7);

  const [AskPriceData, setAskPriceData] = useState([]);
  useEffect(() => {
    setAskPriceData((prevAskPriceData) => [...prevAskPriceData, AskPrice]);
  }, [AskPrice]);
  const recentAskPriceData = AskPriceData.slice(-7);

  const [AskQuantityData, setAskQuantityData] = useState([]);
  useEffect(() => {
    setAskQuantityData((prevAskQuantityData) => [
      ...prevAskQuantityData,
      AskQuantity,
    ]);
  }, [AskQuantity]);
  const recentAskQuantityData = AskQuantityData.slice(-7);

  return (
    <div className={styles.container}>
      <div className={styles.BidContainer}>
        Bid Data
        <div className={styles.BidCurrencyContainer}>
          <div>Price({selectedBidCurrency})</div>
          {recentBidPriceData.map((data, index) => (
            <div key={index}>{data}</div>
          ))}
        </div>
        <div className={styles.BidQuantityContainer}>
          <div>Quantity({selectedBidCurrency})</div>
          {recentBidQuantityData.map((data, index) => (
            <div key={index}>{data}</div>
          ))}
        </div>
      </div>

      <div className={styles.AskContainer}>
        Ask Data
        <div className={styles.AskCurrencyContainer}>
          <div>Price({selectedAskCurrency})</div>
          {recentAskPriceData.map((data, index) => (
            <div key={index}>{data}</div>
          ))}
        </div>
        <div className={styles.AskQuantityContainer}>
          <div>Quantity({selectedAskCurrency})</div>
          {recentAskQuantityData.map((data, index) => (
            <div key={index}>{data}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ladder;
