import "./ladder.module.css";

const Ladder = (props) => {
  const { BidPrice, AskPrice, selectedBidCurrency, selectedAskCurrency } =
    props;
  // Generate an array of BidPrice values at each increment of time
  const BidData = [];
  for (let i = 0; i < 8; i++) {
    BidData.push(BidPrice);
  }

  // Generate an array of BidPrice values at each increment of time
  const AskData = [];
  for (let i = 0; i < 8; i++) {
    AskData.push(AskPrice);
  }
  // use the lastEightBidPrices array to display the last 8 best bid prices
  return <div></div>;
};

export default Ladder;
