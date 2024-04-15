import React, { ChangeEvent, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { RoomDto } from '../../features/rooms/RoomDto';
import { RoomType } from '../../features/rooms/RoomType';
import twins from '../../assets/twins.jpg';

export default function BookingForm() {
    const [numberOfRooms, setNumberOfRooms] = useState<number>(0);
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [availableRooms, setAvailableRooms] = useState<RoomDto[]>([]);
    const [selectedRooms, setSelectedRooms] = useState<RoomDto[]>([]);
    const hotelId = 1; 

    const roomTypes: RoomType[] = [
        { id: 1, name: 'Twin Room', numberOfBeds: 2 },
        { id: 2, name: 'Queen Room', numberOfBeds: 2 },
        { id: 3, name: 'King Room', numberOfBeds: 1 }
    ];

    const handleNumberOfRoomsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setNumberOfRooms(value);
    };

    const handleCheckInChange = (date: Date | null) => {
        setCheckIn(date);
    };

    const handleCheckOutChange = (date: Date | null) => {
        setCheckOut(date);
    };

    const handleRoomSelect = (room: RoomDto) => {
        setSelectedRooms([...selectedRooms, room]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Fetch available rooms data only on form submission
            const availableRoomsResponse = await fetch(`/api/rooms/byhotel/${hotelId}`);
            const availableRoomsData: RoomDto[] = await availableRoomsResponse.json();
            
            // Update available rooms state
            setAvailableRooms(availableRoomsData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleReservation = async () => {
        // Implement reservation logic here, using selectedRooms state
    };

    return (
        <div>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="<KEY>"
                crossOrigin="anonymous"
            ></link>
            <div className="card-group">
                {roomTypes.map(roomType => (
                    <div key={roomType.id} className="card-wrapper">
                        <Card>
                            <Card.Img variant="top" src={twins} />
                            <Card.Body>
                                <Card.Title>{roomType.name}</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label htmlFor={`numberOfRooms_${roomType.name}`}>Number of Rooms</Form.Label>
                                        <Form.Control
                                            id={`numberOfRooms_${roomType.name}`}
                                            type="number"
                                            min={0}
                                            value={numberOfRooms}
                                            onChange={handleNumberOfRoomsChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor={`checkIn_${roomType.name}`}>Check-in Date</Form.Label>
                                        <DatePicker
                                            id={`checkIn_${roomType.name}`}
                                            selected={checkIn}
                                            onChange={handleCheckInChange}
                                            dateFormat="E MMM dd, yyyy"
                                            minDate={new Date()}
                                            className="form-control"
                                            placeholderText="Check-in Date"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor={`checkOut_${roomType.name}`}>Check-out Date</Form.Label>
                                        <DatePicker
                                            id={`checkOut_${roomType.name}`}
                                            selected={checkOut}
                                            onChange={handleCheckOutChange}
                                            dateFormat="E MMM dd, yyyy"
                                            minDate={checkIn || new Date()}
                                            className="form-control"
                                            placeholderText="Check-out Date"
                                            required
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        See Rooms
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            {availableRooms.length > 0 && (
                <div>
                    <h2>Available Rooms:</h2>
                    <ul>
                        {availableRooms.map(room => (
                            <li key={room.id}>
                                Room ID: {room.id}, 
                                Available: {room.isAvailable.toString()}, 
                                <Button onClick={() => handleRoomSelect(room)}>Select</Button>
                            </li>
                        ))}
                    </ul>
                    <Button onClick={handleReservation}>Reserve Rooms</Button>
                </div>
            )}
        </div>
    );
}
