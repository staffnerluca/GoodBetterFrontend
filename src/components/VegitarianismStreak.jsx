import { useState } from 'react';
import './../App.css';

function VegitarianismStreak() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [streakCalendar, setStreakCalendar] = useState(0);

  function Top(){
    return(
      <div className='top'>
        <div className='streakNumber'>
          <image src='images/vegitarianStreakIcon.jpg'>{currentStreak}</image>
        </div>
        Number of eating meat days: <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
        <br></br>
        <input type="checkbox" onChange={meatEatingDaysChanged}></input>
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

  }

  function getCalendarFromServer(){

  }

  return (
    <div>
      <Top></Top>
    </div>
  );
}

export default VegitarianismStreak;
