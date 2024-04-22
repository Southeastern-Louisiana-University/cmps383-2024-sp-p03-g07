import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { HotelDto } from "../../features/hotels/HotelDto";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./homepage.css";
import HotelCardGroup from '../../components/HotelCardGroup';
import Navbar from '../../components/Navbar';


export default function Home() {
    const [hotels, setHotels] = useState<HotelDto[]>([]);
    const [selectedHotel, setSelectedHotel] = useState<number | "">(""); 
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [hotelId, setHotelId] = useState<number | "">("");


    useEffect(() => {
        async function fetchHotels() {
            try {
                const response = await fetch("/api/hotels");
                const data: HotelDto[] = await response.json();
                setHotels(data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        }
        fetchHotels();
    }, []);

    const handleHotelSelect = (e: ChangeEvent<HTMLElement>) => {
        const target = e.target as HTMLSelectElement;
        setSelectedHotel(parseInt(target.value, 10));
        console.log('hotelId:', hotelId);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Check if a hotel is selected and dates are entered
        if (selectedHotel !== "" && checkIn && checkOut) {
            const selectedHotelObject = hotels.find(hotel => hotel.id === selectedHotel);
            if (selectedHotelObject) {
                const id = selectedHotelObject.id;
                setHotelId(id); // Set hotelId in state
                const url = `/booking?hotelId=${id}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`;
                window.location.href = url;
            } else {
                console.error('Invalid hotel selected.');
            }
        } else {
            console.error('Please select a hotel and enter check-in and check-out dates.');
        }
    };
    

    return (
        <>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="<KEY>"
                crossOrigin="anonymous"
            ></link>

            <div className="navbar">
                <Navbar/>
            </div>
            <div className="home-container">
                <h1 style={{ position: "absolute", top: "60px" }}>Find Your Perfect Stay</h1>
                <Form className="hotel-form" onSubmit={handleSubmit}>
                    <Form.Control as="select" onChange={handleHotelSelect} value={selectedHotel}>
                        <option>Select a Hotel</option>
                        {hotels.map((hotel) => (
                            <option key={hotel.id} value={hotel.id}>{hotel.address}</option>
                        ))}
                    </Form.Control>
                    <Form.Group controlId="checkInDate">
                        <DatePicker
                            selected={checkIn}
                            onChange={(date: Date) => setCheckIn(date)}
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
                            minDate={checkIn || new Date()}
                            className="form-control"
                            placeholderText="Check-out Date" />
                    </Form.Group>
                    <Button variant="success" type="submit">Search Hotels</Button>
                    
                    
                </Form>
            </div>
            <div className="hotel-card">
                <HotelCardGroup />
            </div>
        </>
    );
}
