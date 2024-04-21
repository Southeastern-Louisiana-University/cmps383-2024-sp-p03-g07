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
    const [selectedHotel, setSelectedHotel] = useState<string>("");
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);

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

    const handleHotelSelect = (e: ChangeEvent) => {
        const target = e.target as HTMLSelectElement;
        setSelectedHotel(target.value);
    };    

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Check if a hotel is selected and dates are entered
        if (selectedHotel && checkIn && checkOut) {
            let url = "";
            switch (selectedHotel) {
                case "1":
                    url = `/bookingNO?hotelId=${selectedHotel}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`;
                    break;
                case "2":
                    url = `/bookingLC?hotelId=${selectedHotel}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`;
                    break;
                case "3":
                    url = `/bookingBR?hotelId=${selectedHotel}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`;
                    break;
                default:
                    console.error('Invalid hotel selected.');
                    return;
            }
            // Redirect to the booking page
            window.location.href = url;
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
