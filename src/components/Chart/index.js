import { Line } from "react-chartjs-2";

const Chart = (props) => {
  const { BidPrice } = props;

  return (
    <div>
      <Line
        data={{
          labels: [],
          datasets: [
            {
              label: "Bid Price",
              data: [BidPrice],
            },
          ],
        }}
      />
    </div>
  );
};

export default Chart;
