import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const PriceChart = (props) => {
  const { BidPrice, AskPrice } = props;

  const [BidData, setBidData] = useState([]);
  useEffect(() => {
    setBidData((prevBidData) => [...prevBidData, BidPrice]);
  }, [BidPrice]);
  const recentBidData = BidData.slice(-7);

  const [AskData, setAskData] = useState([]);
  useEffect(() => {
    setAskData((prevAskData) => [...prevAskData, AskPrice]);
  }, [AskPrice]);
  const recentAskData = AskData.slice(-7);

  return (
    <div>
      <Line
        data={{
          labels: [
            "7 milliseconds",
            "6 milliseconds",
            "5 milliseconds",
            "4 milliseconds",
            "3 milliseconds",
            "2 milliseconds",
            "1 millisecond",
          ],
          datasets: [
            {
              label: "Bid",
              data: recentBidData,
              backgroundColor: "#06c9f7",
              borderColor: "#06c9f7",
            },
            {
              label: "Ask",
              data: recentAskData,
              backgroundColor: "#ffaf00",
              borderColor: "#ffaf00",
            },
          ],
        }}
      />
    </div>
  );
};

export default PriceChart;
