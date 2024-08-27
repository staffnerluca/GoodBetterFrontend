import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-buttons">
        <Link to="/vegitarianismStreak">
          <button>Vegitarianism Streak</button>
        </Link>
        <Link to="/didYouEatMeat">
          <button>Did You Eat Meat Today?</button>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
