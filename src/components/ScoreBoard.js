import "./scoreboard.css";

const ScoreBorad = ({ score }) => {
  return (
    <div className="text-display">
      <h2> Score: {score}</h2>
      <h3>
        Pop 3 candies
        <br />
        in a row or in a column and earn 3 points!
      </h3>
      <h3>
        Pop 4 candies
        <br />
        in a row or in a column and earn 4 points!
      </h3>
      <div>
        <small>&copy; Amit Dehas protfolio. All rights reserved. </small>
      </div>
    </div>
  );
};

export default ScoreBorad;
