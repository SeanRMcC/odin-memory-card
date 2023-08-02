import {useState, useEffect} from "react";
import Heading from "./components/Heading";
import Card from "./components/Card";
import {v4 as uuid} from "uuid";
import "./styles.css";

export default function App() {

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [dogImages, setDogImages] = useState([]);
  const [previous, setPrevious] = useState([]);

  useEffect(() => {
    const dogPromises = [];
    for(let i = 0; i < 10; i++){
      dogPromises.push(fetch("https://dog.ceo/api/breeds/image/random", {mode: "cors"})
        .then(response => response.json())
        .then(dog => dog.message));
    }
    Promise.all(dogPromises)
      .then(dogs => setDogImages(dogs));

  }, []);

  const dogs = dogImages.map(dogImage => ({
    image: dogImage,
    id: uuid()
  }));

  const cards = dogs.map(dog => <Card key={dog.id} image={dog.image} />)
  return (
    <>
      <Heading />
      <div>Score: {score}</div>
      <div>Best Score: {highScore}</div>
      <div>{cards}</div>
    </>
  );
}