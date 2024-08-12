import { useEffect, useState } from 'react';
import './../App.css';

function VegitarianismStreak() {
  const [username, setUsername] = useState("username1")
  const [currentVegStreak, setCurrentVegStreak] = useState(0);
  const [vegStreakCalendar, setVegStreakCalendar] = useState(0);
  const [numOfMeatFreeDays, setNumOfMeatFreeDays] = useState(1)
  const [loading, setLoading] = useState(true);
  const [meatDays, setMeatDays] = useState({
    Mo: 0,
    Tu: 0,
    We: 0,
    Th: 0,
    Fr: 0,
    Sa: 0,
    Su: 0
  })

  useEffect(() => {
    const getData = async() => {
      try{
        const data = await getDataFromServer();
        setVegStreakCalendar(data["calendar"])
        setMeatDays(data["meat_days"])
        setCurrentVegStreak(data["not_eating_meat_streak"])
      } catch(e){
          alert("Error fetching data"+ e.toString(), ". Using default data (only for test purposes");          
      } finally{
        setLoading(false);
      }
    }
    getData();
  }, [])

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
          <img src='images/vegitarianStreakIcon.jpg'></img>
        </div>
        <div>
          {currentVegStreak}
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

  function CalendarDay({date, status}) {
    let symbol = "❓";
    if(status === "v"){
      symbol = "🐣";
    }
    else if(status !== "f"){
      symbol = "😞";
    }
    else{
      symbol = "🏖️"
    }
    return(
      <div className='calendarDay'>
        {date}
        {symbol}
      </div>
    )
  }

  function Calendar(){
    let calendar = []
    let count = 0;
    for (let day in vegStreakCalendar){
      calendar.push(<CalendarDay key={count} date={day} status={vegStreakCalendar[day]} />);
      count++;
    }
    
    return(
      <div className='calendar'>
        2024
        {calendar}
      </div>
    )
  }

  async function getDataFromServer(){
    try {
      const user = "?username=" + username;

      const response = await fetch('http://127.0.0.1:8000/api/get_data_for_vegetarian_streak_page/'+user, {
          headers: {
              method: 'GET',
              Accept: 'application/json',
          }
      });

      const data = await response.json();
      return data;      
    } catch (err) {
        console.error('Error fetching data:', err.message);
        const calendarData = [
          {"date": "2024-08-09", "vegetarian_status": "f"},
          {"date": "2024-08-08", "vegetarian_status": "v"},
          {"date": "2024-08-07", "vegetarian_status": "m"},
          {"date": "2024-08-06", "vegetarian_status": "f"},
          {"date": "2024-08-05", "vegetarian_status": "v"},
          {"date": "2024-08-04", "vegetarian_status": "v"},
          {"date": "2024-08-03", "vegetarian_status": "v"},
          {"date": "2024-08-02", "vegetarian_status": "v"},
          {"date": "2024-08-01", "vegetarian_status": "v"},
          {"date": "2024-07-31", "vegetarian_status": "v"},
          {"date": "2024-07-30", "vegetarian_status": "f"},
          {"date": "2024-07-29", "vegetarian_status": "v"},
          {"date": "2024-07-28", "vegetarian_status": "f"},
          {"date": "2024-07-27", "vegetarian_status": "v"},
          {"date": "2024-07-26", "vegetarian_status": "m"},
          {"date": "2024-07-25", "vegetarian_status": "f"},
          {"date": "2024-07-24", "vegetarian_status": "v"},
          {"date": "2024-07-23", "vegetarian_status": "v"},
          {"date": "2024-07-22", "vegetarian_status": "m"},
          {"date": "2024-07-21", "vegetarian_status": "f"},
          {"date": "2024-07-20", "vegetarian_status": "f"},
          {"date": "2024-07-19", "vegetarian_status": "m"},
          {"date": "2024-07-18", "vegetarian_status": "f"},
          {"date": "2024-07-17", "vegetarian_status": "m"},
          {"date": "2024-07-16", "vegetarian_status": "v"},
          {"date": "2024-07-15", "vegetarian_status": "m"},
          {"date": "2024-07-14", "vegetarian_status": "f"},
          {"date": "2024-07-13", "vegetarian_status": "f"},
          {"date": "2024-07-12", "vegetarian_status": "f"},
          {"date": "2024-07-11", "vegetarian_status": "f"}
      ];
      let defaultCalendar = {}
      calendarData.forEach(day => {
        defaultCalendar[day.date] = day.vegetarian_status;
      })

      let defaultMeatDays = {"Mo": 0, "Di": 0, "We": 0, "Th": 1, "Fr": 0, "Sa": 0, "Su": 0, "Tu": 1};
      let defaultNotEatingMeatStreak = 5;

      let data = {
        calendar: defaultCalendar,
        not_eating_meat_streak: defaultNotEatingMeatStreak,
        meat_days: defaultMeatDays,
      }
      return data;
    }
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
