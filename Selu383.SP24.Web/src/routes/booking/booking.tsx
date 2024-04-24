import  { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RoomDto } from '../../features/rooms/RoomDto';
import twins from '../../assets/twins.jpg';
import queen from '../../assets/queens.jpg';
import king from '../../assets/king.jpg';
import { useLocation } from 'react-router-dom';
import { ReservationDto } from '../../features/reservations/ReservationDto';
import Navbar from '../../components/Navbar';

export default function Booking() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const checkInParam = params.get('checkIn');
    const checkOutParam = params.get('checkOut');
    const hotelIdParam = params.get('hotelId');
    
    const [checkIn, setCheckIn] = useState<Date | null>(checkInParam ? new Date(checkInParam) : null);
    const [checkOut, setCheckOut] = useState<Date | null>(checkOutParam ? new Date(checkOutParam) : null);
    const [availableRooms, setAvailableRooms] = useState<RoomDto[]>([]);
    const [selectedRooms, setSelectedRooms] = useState<{ room: RoomDto, quantity: number }[]>([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [selectedHotelId] = useState<number | null>(hotelIdParam ? parseInt(hotelIdParam, 10) : null);

    useEffect(() => {
        const fetchAvailableRoomsAndReservations = async () => {
            try {
                if (!checkIn || !checkOut || !selectedHotelId) return;

                const [availableRoomsResponse, reservationsResponse] = await Promise.all([
                    fetch(`/api/rooms/byhotel/${selectedHotelId}`),
                    fetch(`/api/reservations?checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`)
                ]);

                if (!availableRoomsResponse.ok || !reservationsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const [availableRoomsData, reservationsData]: [RoomDto[], ReservationDto[]] = await Promise.all([
                    availableRoomsResponse.json(),
                    reservationsResponse.json()
                ]);

                const filteredRooms = availableRoomsData.filter(room => {
                    return room.isAvailable && !reservationsData.some(reservation =>
                        reservation.roomId === room.id &&
                        ((new Date(reservation.checkIn) < checkOut && new Date(reservation.checkOut) > checkIn) ||
                        (new Date(reservation.checkIn) >= checkIn && new Date(reservation.checkIn) < checkOut)));
                });

                setAvailableRooms(filteredRooms);
            } catch (error) {
                console.error('Error fetching available rooms and reservations:', error);
            }
        };

        fetchAvailableRoomsAndReservations();
    }, [checkIn, checkOut, selectedHotelId]);

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
        if (room.beds === 'Double Twin') {
            return twins;
        } else if (room.beds === 'Double Queen') {
            return queen;
        } else if (room.beds === 'Single King') {
            return king;
        } 
    };

    const handleReservation = () => {
            const reservationURL = `/reservation?selectedRooms=${JSON.stringify(selectedRooms)}&checkIn=${checkIn?.toISOString()}&checkOut=${checkOut?.toISOString()}`;
       
            window.location.href = reservationURL;
       
    };
    

    return (
        <div>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="<KEY>"
                crossOrigin="anonymous"
            ></link>
            <div className="navbar">
                <Navbar  />
            </div>
            <div>
                <Button variant="info" size="sm" className="mt-5" onClick={() => setCartOpen(!cartOpen)}> Reservations ({selectedRooms.reduce((acc, curr) => acc + curr.quantity, 0)})</Button>
                {cartOpen && (
                    <div>
                        <h2 className="mt-3 mb-2">Selected Rooms:</h2>
                        <div>
                            {selectedRooms.map((selectedRoom, index) => (
                                <Card key={index} className="mb-2">
                                    <Card.Body>
                                        <Card.Title>{selectedRoom.room.beds}</Card.Title>
                                        <Card.Text>
                                            Floor: {selectedRoom.room.roomNumber}<br />  
                                            Price: ${selectedRoom.room.price} per night
                                        </Card.Text>
                                        <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(index)}>Remove</Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
                
                <Button variant="success" size="lg" className="mt-3" onClick={handleReservation}>Go to Reservation</Button>

                <h2>Select Dates:</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="checkIn" className="form-label">Check-in Date:</label>
                        <DatePicker
                            id="checkIn"
                            selected={checkIn}
                            onChange={(date) => setCheckIn(date)}
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
                            onChange={(date) => setCheckOut(date)}
                            dateFormat="MM/dd/yyyy"
                            minDate={checkIn || new Date()}
                            className="form-control"
                            required
                        />
                    </div>
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
                                            <Card.Img variant="top" src={getRoomImage(room)} style={{ width: '100%', height: '150px' }} />
                                            <Card.Body>
                                                <Card.Title>{room.beds}</Card.Title>
                                                <Card.Text>
                                                    Room : {room.roomNumber}<br />
                                                    Price: ${room.price} per night
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => handleRoomSelect(room)}>Book</Button>
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
