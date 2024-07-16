import { useState } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import PreviousBtn from "./components/button/PreviousBtn";

const App: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <div>
        <PreviousBtn isClicked={isClicked} setIsClicked={setIsClicked} />
        <BarChart isClicked={isClicked} setIsClicked={setIsClicked} />
      </div>
    </>
  );
};

export default App;
