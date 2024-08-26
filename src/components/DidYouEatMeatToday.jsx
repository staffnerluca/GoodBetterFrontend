import { useEffect, useState } from 'react';
import './../App.css';

function DidYouEatMeatToday() {
  const [userAttributes, setUserAttributes] = useState(0);
  const [isFreeDay, setIsFreeDay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [didUserEatMeat, setDidUserEatMeat] = useState(false);


  useEffect(() => {
    async function checkIsFreeDay(){
      const freeDay = await getIsFreeDay();
      if(freeDay){
        setIsFreeDay(true);
      }
      setIsLoading(false);
    }
    checkIsFreeDay();
  }, [])


  async function storeDidUserEatMeat(result){
    try {
      const url = 'http://127.0.0.1/api/postDidUserEatMeat';
      const user = localStorage.getItem("username")
      const body = JSON.stringify({ username: user, didUserEatMeat: result });
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      });
  
      if (!response.ok) {
        throw new Error('Failed to post data');
      }
      const responseData = await response.json();
      console.log('Success:', responseData);
      setFinished(true);
    } catch (error) {
      console.error('Error posting data:', error);
    }  }


  async function getIsFreeDay(){
    try{
      let username = localStorage.getItem("unsername");
      if(username === null){
        username = "username1"
      }
      const response = await fetch("http://127.0.0.1:8000/api/is_free_day/?username=" + username);
      const data = await response.json();
      return data.result === "f";
    } catch(error){
      console.error("Error in isFreeDay", error);
      return false;
    }
  }

  function AskTheUser(){
    if(isLoading){
      <h1>Loading page</h1>
    }

    if(finished){
      let whatTheUserDidParagraph = "It is awesome that you stuck to your goal today!"
      let buttonText = "No I ate meat today.";
      let resultForChange = "y"
      if(didUserEatMeat){
        whatTheUserDidParagraph = "You ate meat today but don't give up. It will get easyer over time!";
        buttonText = "No I didn't eat meat today.";
        resultForChange = "n"
      }
      return(
        <div>
          <h1>Data stored.</h1>
          <p>{whatTheUserDidParagraph}</p>
          <button onClick={() => storeDidUserEatMeat(resultForChange)}>{buttonText}</button>
        </div>

      )
      
    }
    if(!isFreeDay){
      return(
        <div>
          <center><h1>Did you eat meat today?</h1></center>
          <button className='didYouEatMeatButton' onClick={() => storeDidUserEatMeat("y")}>Sadly yes 😢</button>
          <button className='didYouEatMeatButton' onClick={() => storeDidUserEatMeat("n")}>No 🎉</button>
        </div>
      )
    }
    else{
      <div>
        <h1>Today is your free day.</h1>
        <p>If you didn't eat meat today this is awesome! You can use your eating meat day for a different day.</p>
        <button onClick={() => storeDidUserEatMeat("n")}>I didn't eat meat today 🎉</button>
      </div>
    }
  }

  return (
    <AskTheUser />
  );
}

export default DidYouEatMeatToday;