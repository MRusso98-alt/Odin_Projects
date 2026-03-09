import { forwardRef, useEffect, useState } from 'react'
import './App.css'

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

async function fetchSprite(name){
  try{
    const api = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
    const json = await api.json();
    return json.sprites.front_default;
  } catch (e){
    console.log(e);
  }
}

function processSelected(array, setState, name){
  if(array.includes(name)) setState([]);
  else setState([...array, name]);
}

function GameCards(props){
  const [pokeNames, setNames] = useState(["Roserade", "Magnemite", "Lunala", "Magnezone", "Solgaleo", 
    "Ursaluna", "Ursaring", "Roselia", "Cresselia", "Hatterene", "Bulbasaur", "Tinkaton",
    "Porygon", "Incineroar", "Sprigatito"
  ]);
  const [sprites, setSprites] = useState([]);
  const cardArray = [];

  useEffect(() => {
    async function loadSprites(){
      let spriteData = [];
      
      setNames(shuffleArray(pokeNames));
      for(let i = 0; i < pokeNames.length; i++){
        spriteData[i] = await fetchSprite(pokeNames[i]);
      }

      setSprites(spriteData);
    };

    loadSprites();
  }, [props.score]);

  for(let i = 0; i < pokeNames.length; i++){
    cardArray.push(
      <div key = {pokeNames[i]} className='card' onClick={() => processSelected(props.selected, props.setSelected, pokeNames[i])}>
        <img src = {sprites[i]}></img>
        <h2>{pokeNames[i]}</h2>
      </div>
    );
  }

  return cardArray;
}

function App() {
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    function updateCount(){
      setScore(selected.length);
    }
    
    function updateMaxCount(){
      if(selected.length > maxScore) setMaxScore(selected.length)
    }

    updateCount();
    updateMaxCount();
  }, [selected]);

  return (
    <>
      <div className = "header"> 
        <div className='text-left'>
          <h1>Pokemon memory game</h1>
          <h2>Get points by clicking on an image but don't click on any more than once!</h2>
        </div>
        <div className='scoreboard'>
          <h2>Score: {score}</h2>
          <h2>Max score: {maxScore}</h2>
        </div>
      </div>

      <div className='gamecards'>
        <GameCards selected = {selected} setSelected = {setSelected} score = {score}/>
      </div>
    </>
  );
}

export default App
