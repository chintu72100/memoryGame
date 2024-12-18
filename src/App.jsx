import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './Components/SingleCard';
const cardImages = [
  {"src" : "../public/img/helmet-1.png", matched:false},
  {"src" : "../public/—Pngtree—3d santa claus in a_17484194.png", matched:false},
  {"src" : "../public/—Pngtree—santa claus sleigh christmas gift_19133430.png", matched:false},
  {"src" : "../public/—Pngtree—suswagatam indian woman marathi welcoming_8848128.png", matched:false},
  {"src" : "../public/img/shield-1.png", matched:false},
  {"src" : "https://i.pinimg.com/736x/b3/d5/23/b3d5237a855d3b46d838f37977d15008.jpg", matched:false},
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  //shuffle cards 
  const shuffleCard = ()=>{
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card, id : Math.random()}))
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }
  
  const handleChoice = (card)=>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  //reset choices & increase turn
  const resetTurn = ()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns+1);
    setDisabled(false)
  }

  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCard =>{
          return prevCard.map(card=>{
            if(card.src === choiceOne.src){
              return {...card, matched:true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(()=>{
          resetTurn();
        },500)
        
      }
    }
  },[choiceOne, choiceTwo])
  
  //start a new game automatically
  useEffect(()=>{
    shuffleCard();
  },[])
  return (
    <div className='App'>
        <h1>Magic Match</h1>
        <button onClick={shuffleCard}>New Game</button>
        <div className="card-grid">
          {cards.map(card=>
            <SingleCard 
            card={card} 
            key={card.id}
            handleChoice={handleChoice}
            flipped={card==choiceOne || card==choiceTwo ||card.matched}
            disabled={disabled}
            />
          )}
        </div>
        <h1>Turns : {turns}</h1>
    </div>
  )
}

export default App
