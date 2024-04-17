import React from 'react';
import { Card, CardGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from React Router
import hotelImage1 from '../assets/hotel1.jpg'; // Import the first image
import hotelImage2 from '../assets/hotel2.jpg'; // Import the second image
import hotelImage3 from '../assets/hotel3.jpg'; // Import the third image

const imageStyle: React.CSSProperties = {
  height: '500px', // Set the desired height for the images
  objectFit: 'cover', // Ensure the images cover the entire space
  borderRadius: '10px',
};

const titleStyle: React.CSSProperties = {
  textAlign: 'center', // Center the title text
  fontSize: '2rem', // Increase font size
  marginTop: '20px',
  marginBottom: '20px', // Add space below the title
};

const buttonStyle: React.CSSProperties = {
  marginTop: '10px', // Add margin to separate button from text
};

function HotelCardGroup() {
  return (
    <div>
      <h2 style={titleStyle}>Our Hotels</h2>
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={hotelImage1} style={imageStyle} />
          <Card.Body>
            <Card.Title style={titleStyle}>Enstay New Orleans</Card.Title>
            <Card.Text>
              Located in the heart of New Orleans, this Enstay location offers quick access to the city's attractions. 
              Whether you're visiting for business or pleasure, our comfortable accommodations and friendly staff will make your stay unforgettable.
              Also, try the best seafood around at our 5 star restaurant right here in the hotel.
            </Card.Text>
            <Link to="/bookingNO"> {/* Link to the booking page */}
              <Button variant="primary" style={buttonStyle}>Book now</Button> {/* Button to book now */}
            </Link>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src={hotelImage2} style={imageStyle} />
          <Card.Body>
            <Card.Title style={titleStyle}>Enstay Baton Rouge</Card.Title>
            <Card.Text>
              Located in the vibrant city of Baton Rouge, our Enstay hotel offers modern amenities and convenient access to local attractions.
              Whether you're here for a weekend getaway or an extended stay, our comfortable rooms and exceptional service ensure a memorable experience.
            </Card.Text>
            <Link to="/bookingBR"> {/* Link to the booking page */}
              <Button variant="primary" style={buttonStyle}>Book now</Button> {/* Button to book now */}
            </Link>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src={hotelImage3} style={imageStyle} />
          <Card.Body>
            <Card.Title style={titleStyle}>Enstay Lake Charles</Card.Title>
            <Card.Text>
              Welcome to Enstay Lake Charles, where comfort meets convenience. Our hotel is ideally situated near popular attractions and business destinations,
              making it the perfect choice for both leisure and business travelers. Enjoy modern amenities, spacious accommodations, and personalized service throughout your stay.
            </Card.Text>
            <Link to="/bookingLC"> {/* Link to the booking page */}
              <Button variant="primary" style={buttonStyle}>Book now</Button> {/* Button to book now */}
            </Link>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default HotelCardGroup;