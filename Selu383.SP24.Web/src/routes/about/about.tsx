import React from 'react';
import './about.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <header>
        <h1>About Us</h1>
      </header>
      <main>
        <section className="section">
          <h2>Our Company</h2>
          <p>
          Enstay is a premier hotel chain renowned for its unparalleled hospitality and commitment to excellence. With locations scattered across the picturesque landscapes of Louisiana, Enstay offers guests a perfect blend of luxury, comfort, and convenience. 
          Our dedication to providing exceptional service ensures that every guest's stay is a memorable experience. Whether you're exploring the vibrant city life of New Orleans or indulging in the serene beauty of the bayous, Enstay promises a warm welcome and personalized attention at every turn. 
          Come discover the charm of Louisiana with Enstay, where every moment is crafted to exceed your expectations.
          </p>
        </section>
        <section className="section">
          <h2>Our Team</h2>
          <p>
          At Enstay, our dedicated staff works around the clock to elevate the guest experience to a new level. 
          Committed to excellence, our team embodies the spirit of hospitality, ensuring that every guest feels welcomed, valued, and cared for throughout their stay. 
          From our marvelous front desk personnel to the diligent housekeeping staff ensuring immaculate cleanliness, every member of the Enstay family is passionate about creating memorable moments for our guests. 
          With a commitment to personalized service and a genuine desire to exceed expectations, our staff stands ready to cater to every need, making each guest's stay at Enstay an unforgettable experience filled with warmth, comfort, and genuine hospitality.

          </p>
        </section>
        <section className="section">
          <h2>Our Services</h2>
          <p>
          Enstay offers streamlined services to enhance guest comfort and convenience. Our easy online booking and check-in process ensure a seamless experience from reservation to arrival. 
          Rooms feature QR code door unlocking for quick and secure access. Enjoy diverse dining options at our on-site restaurants and on-call room cleaning for added convenience. At Enstay, every detail is designed to ensure a memorable and hassle-free stay.
          </p>
        </section>
        <section className="section">
          <h2>Our Vision</h2>
          <p>
          At Enstay, our vision is to redefine hospitality, creating lasting memories and enriching experiences for our guests. 
          Through innovation, sustainability, and genuine hospitality, we aim to set new standards in the industry and inspire meaningful connections with every stay.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;