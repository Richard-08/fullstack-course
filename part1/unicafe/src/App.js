import { useState } from "react";

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ data }) => {
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={data.good} />
        <StatisticsLine text="neutral" value={data.neutral} />
        <StatisticsLine text="bad" value={data.bad} />
        <StatisticsLine text="all" value={data.total} />
        <StatisticsLine text="average" value={data.average} />
        <StatisticsLine text="positive" value={data.positive} />
      </tbody>
    </table>
  );
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  const average = (good + neutral + bad) / 3;

  const positive = total > 0 ? (good * 100) / total : 0;

  return (
    <div>
      <section>
        <h1>Give feedback</h1>
        <Button text="good" onClick={() => setGood(good + 1)} />
        <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" onClick={() => setBad(bad + 1)} />
      </section>
      <section>
        <h1>Statistics</h1>
        {total ? (
          <Statistics data={{ good, neutral, bad, total, average, positive }} />
        ) : (
          <p>No feedback given</p>
        )}
      </section>
    </div>
  );
};

export default App;
