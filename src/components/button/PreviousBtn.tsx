interface PreviousBtnProps {
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
}

const PreviousBtn: React.FC<PreviousBtnProps> = ({isClicked,setIsClicked }) => {
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return <button onClick={handleClick}>Previous</button>;
};

export default PreviousBtn;