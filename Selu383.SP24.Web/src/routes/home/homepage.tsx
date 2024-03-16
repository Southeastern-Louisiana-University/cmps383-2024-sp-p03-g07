import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HotelDto } from "../../features/hotels/HotelDto";
import homebg from "../../assets/homebg.jpg"; 
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import "./homepage.css";

export default function Home() {
    const [hotels, setHotels] = useState<HotelDto[]>([]);
    const [selectedHotel, setSelectedHotel] = useState<string>("");

    useEffect(() => {
        fetch("/api/hotels")
            .then((response) => response.json())
            .then((data) => {
                setHotels(data);
            });
    }, []); 
  
    const handleHotelSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedHotel(e.target.value);
    };

    return (
        <section
            className="homebg"
            style={{
                backgroundImage: `url(${homebg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                maxHeight: "100vh",
                overflow: "hidden",
            }}>
            <div className="home-container" >
                <h1 style={{ position: "absolute", top: "70px" }}>Find Your Perfect Stay</h1>
                <Form className="hotel-form">
                    <Form.Control as="select" onChange={handleHotelSelect} value={selectedHotel}>
                        <option>Select a Hotel</option>
                        {hotels.map((hotel) => (
                            <option key={hotel.id} value={hotel.id}>{hotel.address}</option>
                        ))}
                    </Form.Control>
                    <Link
                        onClick={(e) => (!selectedHotel ? e.preventDefault() : null)}
                        to={`/hotel-details/${selectedHotel}`}
                        aria-disabled={!selectedHotel}
                    >
                        <Button variant="success">View Details</Button>
                    </Link>
                </Form>
            </div>
        </section>
    );
}