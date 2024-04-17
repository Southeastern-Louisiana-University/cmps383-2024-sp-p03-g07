import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RoomDto } from '../../features/rooms/RoomDto';
import twins from '../../assets/twins.jpg';
import queen from '../../assets/queens.jpg';
import king from '../../assets/king.jpg';

export default function BookingNO() {
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [availableRooms, setAvailableRooms] = useState<RoomDto[]>([]);
    const [selectedRooms, setSelectedRooms] = useState<{ room: RoomDto, quantity: number }[]>([]);
    const [cartOpen, setCartOpen] = useState(false);

    const hotelId = 1;

    const handleCheckInChange = (date: Date | null) => {
        setCheckIn(date);
    };

    const handleCheckOutChange = (date: Date | null) => {
        setCheckOut(date);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Fetch available rooms data only on form submission
            const availableRoomsResponse = await fetch(`/api/rooms/byhotel/${hotelId}`);
            const availableRoomsData: RoomDto[] = await availableRoomsResponse.json();

            // Filter available rooms based on check-in and check-out dates
            const filteredRooms = availableRoomsData.filter(room => room.isAvailable === true);

            // Update available rooms state
            setAvailableRooms(filteredRooms);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRoomSelect = (room: RoomDto) => {
        const existingRoomIndex = selectedRooms.findIndex(selectedRoom => selectedRoom.room.id === room.id);
        const updatedSelectedRooms = [...selectedRooms];
    
        if (existingRoomIndex !== -1) {
            updatedSelectedRooms[existingRoomIndex].quantity++;
        } else {
            updatedSelectedRooms.push({ room, quantity: 1 });
        }
    
        setSelectedRooms(updatedSelectedRooms);
    };

    const handleRemoveFromCart = (index: number) => {
        const updatedSelectedRooms = [...selectedRooms];
        updatedSelectedRooms.splice(index, 1);
        setSelectedRooms(updatedSelectedRooms);
    };

    const getRoomImage = (room: RoomDto) => {
        if (room.beds === 'Twin Bed') {
            return twins;
        } else if (room.beds === 'Queen Bed') {
            return queen;
        } else if (room.beds === 'King Bed') {
            return king;
        } else {
            // Default image if the bed type is not recognized
            return null;
        }
    };

    return (
        <div>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="<KEY>"
                crossOrigin="anonymous"
            ></link>
            <div>
                <Button variant="info" size="sm" className="mt-3" onClick={() => setCartOpen(!cartOpen)}>View Cart ({selectedRooms.reduce((acc, curr) => acc + curr.quantity, 0)})</Button>
                {cartOpen && (
                    <div>
                        <h2 className="mt-3 mb-2">Selected Rooms:</h2>
                        <div>
                            {selectedRooms.map((selectedRoom, index) => (
                                <Card key={index} className="mb-2">
                                    <Card.Body>
                                        <Card.Title>{selectedRoom.room.beds}</Card.Title>
                                        <Card.Text>
                                            Room ID: {selectedRoom.room.id}<br />
                                            Type: {selectedRoom.room.beds}<br />
                                            Available: {selectedRoom.room.isAvailable ? 'Yes' : 'No'}
                                        </Card.Text>
                                        <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(index)}>Remove</Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
                <h2>Select Dates:</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="checkIn" className="form-label">Check-in Date:</label>
                        <DatePicker
                            id="checkIn"
                            selected={checkIn}
                            onChange={handleCheckInChange}
                            dateFormat="MM/dd/yyyy"
                            minDate={new Date()}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="checkOut" className="form-label">Check-out Date:</label>
                        <DatePicker
                            id="checkOut"
                            selected={checkOut}
                            onChange={handleCheckOutChange}
                            dateFormat="MM/dd/yyyy"
                            minDate={checkIn || new Date()}
                            className="form-control"
                            required
                        />
                    </div>
                    <Button variant="primary" type="submit">
                        See Available Rooms
                    </Button>
                </form>
            </div>

            {availableRooms.length > 0 && (
                <div>
                    <h2>Available Rooms:</h2>
                    <Container fluid>
                        <Row xs={1} sm={2} md={3} lg={4}>
                            {availableRooms.map(room => (
                                <Col key={room.id}>
                                    <div className="card-wrapper mb-3">
                                        <Card>
                                            <Card.Img variant="top" src={getRoomImage(room) ?? ''} style={{ width: '100%', height: '150px' }} />
                                            <Card.Body>
                                                <Card.Title>{room.beds}</Card.Title>
                                                <Card.Text>
                                                    Room ID: {room.id}<br />
                                                    Type: {room.beds}<br />
                                                    Available: {room.isAvailable ? 'Yes' : 'No'}
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => handleRoomSelect(room)}>Select</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            )}
        </div>
    );
}
