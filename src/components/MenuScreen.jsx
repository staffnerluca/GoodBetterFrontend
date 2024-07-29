import * as React from "react"
import { useState } from "react";
import "./../index.css";


export default function MenuScreen() {
  const [userState, setUserState] = useState("None")
  const [goodThings, setGoodThings] = useState("None");
  const [loading, setLoading] = useState(true);
  const [connectionErrorAlarmSent, setConnectionErrorAlarmSent] = useState(false);

  React.useEffect(() => {
    const userName = "max@gmail.com";//JSON.parse(localStorage.getItem("username"));
    if(userName && loading && userState == "None" && goodThings == "None"){
      loadUser();
      loadGoodThings();
      setLoading(false);
    }
  }, [loading, userState, goodThings]) //empty dependency array makes sure the code is only executed once

  async function loadUser(){
    const user = await getUserFromServer();
    if(user){
      setUserState(user);
    }
    else {
      if(!connectionErrorAlarmSent){
        alert("Not able to user data from server. Using default user");

      }
      const loadingErroUser = {
        doing_good_score: 100, //"not able to load",
        doing_good_streak: 0, // "not able to load",
        wants_to_become_vegetarian: true,//"not able to load",
        not_eating_meat_streak: 0 //"not able to load"
      }
      setUserState(loadingErroUser);
      console.log("The user: " + userState);
    }
  }

  async function loadGoodThings(){
    const goodThingsFromServer = await getGoodThingsFromServer();
    if(goodThingsFromServer){
      setGoodThings(goodThingsFromServer);
    }
    else{
      if(!connectionErrorAlarmSent){
        alert("Using default good things");
        setConnectionErrorAlarmSent(true);
      }
      const loadingErrorGoodThings = {
        donate: {
          image_link: "assets/react.svg", // change to "malaria_consortium.png"
          name: "Malaria Consortium",
          content: "It takes 7 $ to protect a child from Malaria. Almost 600.000 <br /> people (mostly children under the age of 5) die from it each <br /> year. Malaria Consortium fights it using Anti-insecticide nets, <br /> preventive medecine for vulnerable groubs and also by consul- <br /> ting government about how to implement effecitive measures. <br />",
          points: 20
        },
        course: {
          image_link: "assets/react.svg", // change to "starter_course.png"
          name: "Morality 101",
          content: "Our courses are a great way to sharpen your moral thinking. Not sure where to start? Morality 101 helps you to learn aboiut the most common schools of thought and introduces you to some interesting problems.",
          points: 10
        },
        other: {
          image_link: "assets/react.svg", // change to "metta_meditation.png"
          name: "Meditate on love",
          content: "Love is the most powerful emotion we humans are capable of but we often foget to think about it in our day to day lives. In a buddhist Metta meditation your a not just thinking about the people you love and care about but you are also trying to expand this love to every sentinent beeing. Soudns interesting to you? Just try it!",
          points: 10      
        }
      }
      setGoodThings(loadingErrorGoodThings);
      console.log(goodThings)
    }
  }  

  async function getUserFromServer(){
    return getDataFromServer("getUser");
  }

  async function getGoodThingsFromServer(){
    return getDataFromServer("getGoodThings");
  }

  async function testServer() {
    let tester = await getDataFromServer("get_current_course_lesson/");
    console.log("the Tester: " + JSON.stringify(tester));
  }
  
  async function getDataFromServer(address) {
    try {
      const username = "max@mustermann.com";//JSON.parse(localStorage.getItem("username"));
      if (!username) {
        throw new Error("Username not found in local storage");
      }
      const response = await fetch("http://127.0.0.1:8000/api/" + address, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        alert("The response was not ok");
        throw new Error("HTTP error! Status was not ok");
      }
      const user = await response.json();
      return user;
    } 
    catch (error) {
        return null;
    }
  }

  function TopMenu(){
    testServer()
    console.log("Die Punkte: " + userState["doing_good_score"]);
    let vegetarian_menu = null;
    if(userState["wants_to_become_vegetarian"]){
      vegetarian_menu = <div>{userState["not_eating_meat_streak"]}</div>
    }
    return(
      <div className="flex gap-5 justify-between items-center self-stretch w-full text-xl">
        <div className="self-stretch my-auto text-6xl text-center text-red-600">
          ❤️
        </div>
        <div>
          {userState["doing_good_streak"]}
        </div>
        <div className="flex gap-1 self-stretch my-auto text-black">
          <div className="grow my-auto">{userState["doing_good_score"]} </div>
          <img
            loading="lazy"
            srcSet="..."
            className="shrink-0 aspect-square w-[30px]"
          />
        </div>
        <div className="flex overflow-hidden relative flex-col justify-center items-start self-stretch px-5 py-6 whitespace-nowrap aspect-square text-stone-50 w-[62px]">
          <img
            loading="lazy"
            srcSet="..."
            className="object-cover absolute inset-0 size-full"
          />
          {vegetarian_menu}
        </div>
      </div>
    )
  }

  function DailyQuote(){
    return(
      <p className="dailyQuote">Here could be your quote</p>
    );
  }

  function GoodThingBox({type}){
    if(!loading){
      const currentGoodThing = goodThings[type];
      const goodThingName = currentGoodThing["name"];
      const goodThingContent = currentGoodThing["content"];
      const goodThingImageLink = currentGoodThing["image_link"];
     
      return(
        <div className="flex overflow-hidden relative flex-col px-3 py-1 mt-7 w-full aspect-[2.12] max-w-[297px]">
        <img
          loading="lazy"
          srcSet="..."
          className="object-cover absolute inset-0 size-full"
        />
        <div className="relative text-sm text-white">{type}</div>
        <div className="flex relative flex-col py-2 mt-4 text-black bg-stone-400">
          <div className="self-center text-sm">{goodThingName}</div>
          <div className="mt-2 text-xs">
            {goodThingContent}
          </div>
        </div>
        <div className="flex relative gap-5 justify-between items-start self-end max-w-full text-xs w-[178px]">
          <div className="justify-center px-2 py-1.5 text-black bg-white">
            DONATE NOW
          </div>
          <div className="flex gap-0.5 mt-2.5 text-white whitespace-nowrap">
            <div className="grow">+10</div>
            <img
              loading="lazy"
              srcSet="..."
              className="shrink-0 w-2.5 aspect-square"
            />
          </div>
        </div>
      </div>
      )
    }
  }

  function FooterMenu(){
    return(
      <div className="flex gap-5 justify-between mt-12 max-w-full w-[238px]">
        <img
          loading="lazy"
          srcSet="..."
          className="shrink-0 my-auto aspect-[0.97] w-[30px]"
        />
        <img
          loading="lazy"
          srcSet="..."
          className="shrink-0 aspect-square w-[43px]"
        />
        <img
          loading="lazy"
          srcSet="..."
          className="shrink-0 aspect-square w-[43px]"
        />
      </div>
    )
  }

  function MenuScreenElements() {
    if (loading) {
      return <p>Still loading</p>;
    }
    return (
      <div>
        <TopMenu />
        <DailyQuote />
        <GoodThingBox type="donate" /> 
        <GoodThingBox type="course" />
        <GoodThingBox type="other" />
        <FooterMenu />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col justify-center bg-white max-w-[360px]">
      <div className="flex flex-col items-center px-6 pt-4 pb-20 w-full bg-sky-300">
        <MenuScreenElements />
      </div>
    </div>
  );
}