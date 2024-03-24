import React from 'react';
import { Link } from 'react-router-dom';
import './help.css'; // Make sure to import the CSS file

const HelpPage: React.FC = () => {
  return (
    <div className="help-page">
      <header>
        <h1>Booking Help</h1>
      </header>
      <main>
        <section className="help-content">
          <h2>How to book a room</h2>
          <p>
            To book a room, please start by creating an enstay account account. Once you have created an account, browse our hotels and locations for one that suits your travel needs. 
            Once you have made your selection, click the book now button and follow the steps. It's that easy!
          </p>
          <div className="button-container">
            <Link to="/signup">
              <button className="signup-button">Sign Up</button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HelpPage;