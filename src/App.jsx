import {useState, useEffect} from "react";
import Heading from "./components/Heading";
import Card from "./components/Card";
import {v4 as uuid} from "uuid";
import "./styles.css";

export default function App() {

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [dogs, setDogs] = useState([]);
  const [previous, setPrevious] = useState([]);

  useEffect(() => {
    const dogPromises = [];
    for(let i = 0; i < 12; i++){
      dogPromises.push(fetch("https://dog.ceo/api/breeds/image/random", {mode: "cors"})
        .then(response => response.json())
        .then(dog => dog.message));
    }
    Promise.all(dogPromises)
      .then(dogImages => setDogs(dogImages.map(dogImage => ({
        image: dogImage,
        id: uuid()
      }))));

  }, []);

  function handleClick(id){
    if(previous.some(prevId => prevId === id)){
      if(score > highScore){
        setHighScore(score);
      }
      setScore(0);
      setPrevious([]);
    }else{
      setPrevious(currPrevious => [...currPrevious, id]);
      setScore(currScore => currScore + 1);
    }
    shuffle();
  }

  function shuffle(){
    setDogs(currDogs => currDogs.sort(() => (Math.random() > .5) ? 1 : -1));
  }

  const cards = dogs.map(dog => <Card handleClick={() => handleClick(dog.id)} key={dog.id} image={dog.image} />)
  return (
    <>
      <Heading />
      <div className="scores">
        <div>Score: {score}</div>
        <div>Best Score: {highScore}</div>
      </div>
      <div className="card-grid">{cards}</div>
    </>
  );
}