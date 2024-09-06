import React, { useEffect, useState } from "react";
import "../style/Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", handleShow);
    };
  }, []);

  return (
    <div
      className={`nav w-full justify-between items-center p-3 ${
        show && "nav__black"
      }`}
    >
      <img
        className="nav_logo object-contain"
        src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Netflix_Logomark.png"
        alt="netflix logo"
      />
      <div className="nav_btns gap-2">
        <div className="hidden md:block">UNLIMITED TV SHOWS & MOVIES</div>
        <button className="nav__btn nav_btn2">Join Now</button>
        <button className="nav__btn nav_btn1">Sign in</button>
      </div>
    </div>
  );
}

export default Nav;
