import styles from "./bid.module.css";

const BestBid = ({ onChange, selectedBidCurrency, BidPrice, BidQuantity }) => {
  return (
    <div className={styles.BidContainer}>
      Best Bid for
      <select value={selectedBidCurrency} onChange={onChange}>
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
