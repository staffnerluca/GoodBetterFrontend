import { useEffect, useState } from "react";
import "./../App.css";
import { useVegStreak } from "./VegStreakContext";

function VegitarianismStreak() {
  const [username, setUsername] = useState("username1");
  const { currentVegStreak, setCurrentVegStreak } = useVegStreak();

  const [vegStreakCalendar, setVegStreakCalendar] = useState([]);
  const [numOfMeatFreeDays, setNumOfMeatFreeDays] = useState(1);
  const [loading, setLoading] = useState(true);
  const [meatDays, setMeatDays] = useState({
    Mo: 0,
    Tu: 0,
    We: 0,
    Th: 0,
    Fr: 0,
    Sa: 0,
    Su: 0,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDataFromServer();
        const cal = data["calendar"];
        const dates = cal.map(entry => ({ date: entry.date, status: entry.vegetarian_status }));

        setVegStreakCalendar(dates);
        setMeatDays(data["meat_days"]);
        setCurrentVegStreak(data["not_eating_meat_streak"]);
      } catch (e) {
        alert(
          "Error fetching data" + e.toString(),
          ". Using default data (only for test purposes)"
        );
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  function meatEatingDaysChanged(checkbox, day) {
    let tmp = meatDays;
    if (checkbox.target.checked) {
      tmp[day] = 1;
    } else {
      tmp[day] = 0;
    }
    const sum = Object.values(tmp).reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    if (sum > numOfMeatFreeDays + 1) {
      alert("Too many days chosen!");
      checkbox.target.checked = false;
    }
  }

  function numOfEatingMeatDaysChanged(event) {
    setNumOfMeatFreeDays(event.target.value);
  }

  function Top() {
    return (
      <div className="top">
        Number of eating meat days:{" "}
        <select value={numOfMeatFreeDays} onChange={numOfEatingMeatDaysChanged}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
        <br></br>
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
          <label key={index}>
            {day}:
            <input
              type="checkbox"
              onChange={(e) => meatEatingDaysChanged(e, day)}
            />
          </label>
        ))}
      </div>
    );
  }

  function CalendarDay({ date, status }) {
    let symbol = "❓";
    if (status === "v") {
      symbol = "🐣";
    } else if (status === "m") {
      symbol = "😞";
    } else if (status === "f") {
      symbol = "🏖️";
    }
    return (
      <div className="calendarDay">
        {date} {symbol}
      </div>
    );
  }

  function Calendar() {
    return (
      <div className="calendar">
        <h2>2024 Vegetarianism Streak Calendar</h2>
        {vegStreakCalendar.map((entry, index) => (
          <CalendarDay key={index} date={entry.date} status={entry.status} />
        ))}
      </div>
    );
  }

  async function getDataFromServer() {
    try {
      const user = username;

      const response = await fetch("http://127.0.0.1:8000/api/get_data_for_vegetarian_streak_page/" + user,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching data:", err.message);
      const calendarData = [
        { date: "2024-08-09", vegetarian_status: "f" },
        { date: "2024-08-08", vegetarian_status: "v" },
        { date: "2024-08-07", vegetarian_status: "m" },
        { date: "2024-08-06", vegetarian_status: "f" },
        { date: "2024-08-05", vegetarian_status: "v" },
        { date: "2024-08-04", vegetarian_status: "v" },
        { date: "2024-08-03", vegetarian_status: "v" },
        { date: "2024-08-02", vegetarian_status: "v" },
        { date: "2024-08-01", vegetarian_status: "v" },
        { date: "2024-07-31", vegetarian_status: "v" },
        { date: "2024-07-30", vegetarian_status: "f" },
        { date: "2024-07-29", vegetarian_status: "v" },
        { date: "2024-07-28", vegetarian_status: "f" },
        { date: "2024-07-27", vegetarian_status: "v" },
        { date: "2024-07-26", vegetarian_status: "m" },
        { date: "2024-07-25", vegetarian_status: "f" },
        { date: "2024-07-24", vegetarian_status: "v" },
        { date: "2024-07-23", vegetarian_status: "v" },
        { date: "2024-07-22", vegetarian_status: "m" },
        { date: "2024-07-21", vegetarian_status: "f" },
        { date: "2024-07-20", vegetarian_status: "f" },
        { date: "2024-07-19", vegetarian_status: "m" },
        { date: "2024-07-18", vegetarian_status: "f" },
        { date: "2024-07-17", vegetarian_status: "m" },
        { date: "2024-07-16", vegetarian_status: "v" },
        { date: "2024-07-15", vegetarian_status: "m" },
        { date: "2024-07-14", vegetarian_status: "f" },
        { date: "2024-07-13", vegetarian_status: "f" },
        { date: "2024-07-12", vegetarian_status: "f" },
        { date: "2024-07-11", vegetarian_status: "f" },
      ];
      let defaultCalendar = calendarData;

      let defaultMeatDays = {
        Mo: 0,
        Di: 0,
        We: 0,
        Th: 1,
        Fr: 0,
        Sa: 0,
        Su: 0,
        Tu: 1,
      };
      let defaultNotEatingMeatStreak = 5;

      let data = {
        calendar: defaultCalendar,
        not_eating_meat_streak: defaultNotEatingMeatStreak,
        meat_days: defaultMeatDays,
      };
      return data;
    }
  }

  function saveChangesInMeatEatingSettings() {}

  return (
    <div>
      <Top />
      <Calendar />
      <button onClick={saveChangesInMeatEatingSettings}>Save</button>
    </div>
  );
}

export default VegitarianismStreak;
