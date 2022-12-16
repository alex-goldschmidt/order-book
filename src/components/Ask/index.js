import styles from "./ask.module.css";

const BestAsk = ({ onChange, selectedAskCurrency, AskPrice, AskQuantity }) => {
  return (
    <div className={styles.AskContainer}>
      Best Ask for
      <select value={selectedAskCurrency} onChange={onChange}>
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
