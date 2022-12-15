import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useState, useEffect } from "react";
Chart.register(...registerables);

const PriceChart = (props) => {
  const { BidPrice, AskPrice } = props;
  /*
  // Get the current time in milliseconds
  const now = Date.now();
  const easternDate = new Date(now);
  easternDate.setTime(now - 5 * 60 * 60 * 1000);

  // Generate an array of labels in "HH:MM:SS" format,
  // starting from the most recent increment and going
  // backwards in time by 15 second increments.
  const labels = [];
  for (let i = 0; i < 8; i++) {
    const timestamp = easternDate - i * 15000;
    labels.push(new Date(timestamp).toISOString().substring(11, 19));
  }
  labels.reverse();
  */

  // Generate an array of BidPrice values at each increment of time

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
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
            },
            {
              label: "Ask",
              data: recentAskData,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
            },
          ],
        }}
      />
    </div>
  );
};

export default PriceChart;
