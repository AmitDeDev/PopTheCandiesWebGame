import { useEffect, useState } from "react";
import ScoreBorad from "./components/ScoreBoard";
import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import orangeCandy from "./images/orange-candy.png";
import purpleCandy from "./images/purple-candy.png";
import redCandy from "./images/red-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import blank from "./images/poof-image.png";

const width = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
];

const App = () => {
  const [currentClorArrangement, setCurrentClorArrangement] = useState([]);
  const [squareDragged, setSquareDragged] = useState(null);
  const [squareReplaced, setSquareReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  // Checking fot Column & Row of -> 4

  const checkForColOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const colOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentClorArrangement[i];
      const isBlank = currentClorArrangement[i] === blank;

      if (
        colOfFour.every(
          (square) =>
            currentClorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        colOfFour.forEach((square) => (currentClorArrangement[square] = blank));
        return true;
      }
    }
  };

  const checkForRowOfTFour = () => {
    for (let i = 0; i < 47; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentClorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentClorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentClorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach((square) => (currentClorArrangement[square] = blank));
        return true;
      }
    }
  };

  // Checking fot Column & Row of -> 3

  const checkForColOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const colOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentClorArrangement[i];
      const isBlank = currentClorArrangement[i] === blank;

      if (
        colOfThree.every(
          (square) =>
            currentClorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        colOfThree.forEach(
          (square) => (currentClorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentClorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentClorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentClorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currentClorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  // END of cheks ROWs && Columns

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentClorArrangement[i] === blank) {
        let randomNumer = Math.floor(Math.random() * candyColors.length);
        currentClorArrangement[i] = candyColors[randomNumer];
      }
      if (currentClorArrangement[i + width] === blank) {
        currentClorArrangement[i + width] = currentClorArrangement[i];
        currentClorArrangement[i] = blank;
      }
    }
  };

  // Drag - Drop - End Drag flow -> algorithem
  // Drag Start
  const dragStart = (e) => {
    console.log(e.target);
    console.log("drag start");
    setSquareDragged(e.target);
  };
  //Drag Drop -> replaced
  const dragDrop = (e) => {
    console.log(e.target);
    console.log("drag Drop");
    setSquareReplaced(e.target);
  };
  // Drag end flow -> validation and replacement
  const dragEnd = () => {
    console.log("drag END");

    // Saveing the dragged squared id
    const squareDraggedId = parseInt(squareDragged.getAttribute("data-id"));
    // saveing the id of the square that replaced and saving it as a number in order
    const squareReplacedId = parseInt(squareReplaced.getAttribute("data-id"));

    currentClorArrangement[squareReplacedId] =
      squareDragged.getAttribute("src");
    currentClorArrangement[squareDraggedId] =
      squareReplaced.getAttribute("src");

    console.log("squareDragged", squareDraggedId);
    console.log("squareReplaced", squareReplacedId);

    const validMoves = [
      squareDraggedId - 1,
      squareDraggedId - width,
      squareDraggedId + 1,
      squareDraggedId + width,
    ];

    const validMove = validMoves.includes(squareReplacedId);

    const isAColOfFour = checkForColOfFour();
    const isARowOfFour = checkForRowOfTFour();
    const isAColOfThree = checkForColOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColOfThree || isAColOfFour)
    ) {
      setSquareDragged(null);
      setSquareReplaced(null);
    } else {
      currentClorArrangement[squareReplacedId] =
        squareReplaced.getAttribute("src");
      currentClorArrangement[squareDraggedId] =
        squareDragged.getAttribute("src");
      setCurrentClorArrangement([...currentClorArrangement]);
    }
  };

  // Create the BOARD of the game

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomNumberFrom0to5 = Math.floor(
        Math.random() * candyColors.length
      );
      const randomColor = candyColors[randomNumberFrom0to5];
      randomColorArrangement.push(randomColor);
    }
    setCurrentClorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColOfFour();
      checkForRowOfTFour();
      checkForColOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentClorArrangement([...currentClorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColOfFour,
    checkForRowOfTFour,
    checkForColOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentClorArrangement,
  ]);

  console.log(currentClorArrangement);

  return (
    <div>
      <h1>Welcome to my Pop the candy GAME </h1>
      <div className="app">
        <div className="game">
          {currentClorArrangement.map((candyColors, index) => (
            <img
              key={index}
              src={candyColors}
              alt={candyColors}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          ))}
        </div>
        <ScoreBorad score={scoreDisplay} />
      </div>
    </div>
  );
};

export default App;
