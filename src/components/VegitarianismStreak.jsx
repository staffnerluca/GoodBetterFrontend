import { useState } from 'react';
import './../App.css';

function VegitarianismStreak() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [streakCalendar, setStreakCalendar] = useState(0);
  const [numOfMeatFreeDays, setNumOfMeatFreeDays] = useState(1)
  const [meatFreeDays, setMeatFreeDays] = useState({
    Mo: 0,
    Tu: 0,
    We: 0,
    Th: 0,
    Fr: 0,
    Sa: 0,
    Su: 0
  })

  function meatEatingDaysChanged(checkbox, day){
    let tmp = meatFreeDays;
    if(checkbox.target.checked){
      tmp[day] = 1;
    }
    else{
      tmp[day] = 0;
    }
    const sum = Object.values(tmp).reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    if(sum > numOfMeatFreeDays){
      alert("Too many days chosen!")
      checkbox.target.checked = false;
    }
  }

  function numOfEatingMeatDaysChanged(event){
    setNumOfMeatFreeDays(event.target.value);
    event
  }

  function Top(){
    return(
      <div className='top'>
        <div className='streakNumber'>
          <image src='images/vegitarianStreakIcon.jpg'>{currentStreak}</image>
        </div>
        Number of eating meat days: <select value={numOfMeatFreeDays} onChange={numOfEatingMeatDaysChanged}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
        <br></br>
        Mo:<input type="checkbox" onChange={(e) => meatEatingDaysChanged(e, "Mo")}></input> 
        Tu:<input type="checkbox" onChange={(e) => meatEatingDaysChanged(e, "Tu")}></input>
        We:<input type="checkbox" onChange={(e) => meatEatingDaysChanged(e, "We")}></input>
        Th:<input type="checkbox" onChange={(e) => meatEatingDaysChanged(e, "Th")}></input>
        Fr:<input type="checkbox" onChange={(e) => meatEatingDaysChanged(e, "Fr")}></input>
        Sa:<input type="checkbox" onChange={(e) => meatEatingDaysChanged(e, "Sa")}></input>
        Su:<input type="checkbox" onChange={(e) => meatEatingDaysChanged(e, "Su")}></input>
      </div>
    )
  }

  function CalendarDay(date, wasVegetarian, freeDay) {
    let symbol = "images/freeDay.jpg";
    if(wasVegetarian){
      symbol = "images/vegetarian.jpg";
    }
    else if(!freeDay){
      symbol = "images/free"
    }
    return(
      <div className='calendarDay'>
        {date}
        <image src={symbol}></image>
      </div>
    )
  }

  function Calendar(){
    return(
      <div className='calendar'>
        2024
      </div>
    )
  }

  function getCalendarFromServer(){

  }

  function saveChangesInMeatEatingSettings(){
    
  }

  return (
    <div>
      <Top></Top>
      <Calendar></Calendar>
      <button onClick={saveChangesInMeatEatingSettings}>Save</button>
    </div>
  );
}

export default VegitarianismStreak;
