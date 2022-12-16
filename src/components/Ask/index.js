import styles from "./ask.module.css";

const BestAsk = ({ onChange, selectedAskCurrency, AskPrice, AskQuantity }) => {
  return (
    <div className={styles.AskContainer}>
      Best Ask for
      <select
        data-testid="select"
        value={selectedAskCurrency}
        onChange={onChange}
      >
        <option data-testid="option-1" value="BTC-USD">
          BTC-USD
        </option>
        <option data-testid="option-2" value="ETH-USD">
          ETH-USD
        </option>
        <option data-testid="option-3" value="LTC-USD">
          LTC-USD
        </option>
        <option data-testid="option-4" value="BCH-USD">
          BCH-USD
        </option>
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
