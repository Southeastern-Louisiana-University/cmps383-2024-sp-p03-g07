import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HotelDto } from "../../features/hotels/HotelDto";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./homepage.css";
import HotelCardGroup from '../../Components/HotelCardGroup';

export default function Home() {
    const [hotels, setHotels] = useState<HotelDto[]>([]);
    const [selectedHotel, setSelectedHotel] = useState<string>("");
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);

    useEffect(() => {
        fetch("/api/hotels")
            .then((response) => response.json())
            .then((data) => {
                setHotels(data);
            });
    }, []); 
  

    const handleHotelSelect = (e: ChangeEvent) => {
        const target = e.target as HTMLSelectElement;
        setSelectedHotel(target.value);
    };    

    return (
        <>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="<KEY>"
                crossOrigin="anonymous"
            ></link>

                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Enstay</Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav ms-auto">
                                <Link className="nav-item nav-link" to="/hotel-details/hoteldetails">Hotels</Link>
                                <Link className="nav-item nav-link" to="/login">Login</Link>
                                <Link className="nav-item nav-link" to="/sign-up">Sign-Up</Link>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="home-container">
                    <h1 style={{ position: "absolute", top: "60px" }}>Find Your Perfect Stay</h1>
                    <Form className="hotel-form">
                        <Form.Group controlId="hotelSelect">
                            <Form.Control as="select" onChange={handleHotelSelect} value={selectedHotel}>
                                <option>Select a Hotel</option>
                                {hotels.map((hotel) => (
                                    <option key={hotel.id} value={hotel.id}>{hotel.address}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="checkInDate">
                            <DatePicker
                                selected={checkInDate}
                                onChange={(date: Date) => setCheckInDate(date)}
                                dateFormat="E MMM dd, yyyy"
                                minDate={new Date()}
                                className="form-control"
                                placeholderText="Check-in Date" />
                        </Form.Group>
                        <Form.Group controlId="checkOutDate">
                            <DatePicker
                                selected={checkOut}
                                onChange={(date: Date) => setCheckOut(date)}
                                dateFormat="E MMM dd, yyyy"
                                minDate={checkInDate || new Date()}
                                className="form-control"
                                placeholderText="Check-out Date" />
                        </Form.Group>
                        <Link to={`/hotel-details/${selectedHotel}`}>
                            <Button variant="success">View Hotels</Button>
                        </Link>
                    </Form>
                </div>
                <div className="hotel-card">
                <HotelCardGroup />
                </div>
        
        </>
    );
}
