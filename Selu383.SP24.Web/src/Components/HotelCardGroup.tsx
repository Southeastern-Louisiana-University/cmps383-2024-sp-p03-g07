import React, { useState, useEffect } from 'react';
import { Card, CardGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HotelDto } from "../features/hotels/HotelDto";
import hotelImage1 from '../assets/hotel1.jpg'; // Import the first image
import hotelImage2 from '../assets/hotel2.jpg'; // Import the second image
import hotelImage3 from '../assets/hotel3.jpg'; // Import the third image

const imageStyle: React.CSSProperties = {
  height: '500px',
  objectFit: 'cover',
  borderRadius: '10px',
};

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '2rem',
  marginTop: '20px',
  marginBottom: '20px',
};

const buttonStyle: React.CSSProperties = {
  marginTop: '10px',
};

function HotelCardGroup() {
  const [hotels, setHotels] = useState<{ hotel: HotelDto, address: string }[]>([]);
  useEffect(() => {
    async function fetchHotels() {
        try {
            const response = await fetch("/api/hotels");
            const hotelData: HotelDto[] = await response.json();
            const hotelAddresses = await Promise.all(hotelData.map(async (hotel) => {
              const response = await fetch(`/api/hotels/address/${encodeURIComponent(hotel.address)}`);
              const data = await response.json();
              return { hotel: hotel, address: data.address };
            }));
            setHotels(hotelAddresses);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    }
    fetchHotels();
  }, []);

  return (
    <div>
      <h2 style={titleStyle}>Our Hotels</h2>
      <CardGroup>
        {hotels.map((hotel, index) => (
          <Card key={index}>
            <Card.Img variant="top" src={index === 0 ? hotelImage1 : index === 1 ? hotelImage2 : hotelImage3} style={imageStyle} />
            <Card.Body>
              <Card.Title style={titleStyle}>{hotel.address}</Card.Title>
              
              <Link to={`/booking?hotelId=${hotel.hotel.id}`}>
                <Button variant="primary" style={buttonStyle}>Book now</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
}

export default HotelCardGroup;
