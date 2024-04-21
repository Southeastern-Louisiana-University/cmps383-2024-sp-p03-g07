import { useLocation } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import twins from '../../assets/twins.jpg';
import queen from '../../assets/queens.jpg';
import king from '../../assets/king.jpg';
import { RoomDto } from '../../features/rooms/RoomDto';

export default function Reservation() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const selectedRooms: { room: RoomDto, quantity: number }[] = JSON.parse(params.get('selectedRooms') || '[]');
    const checkIn = new Date(params.get('checkIn')!);
    const checkOut = new Date(params.get('checkOut')!);

    const getRoomImage = (room: RoomDto) => {
        if (room.beds === 'Double Twin') {
            return twins;
        } else if (room.beds === 'Double Queen') {
            return queen;
        } else if (room.beds === 'Single King') {
            return king;
        } 
    };

    const calculateTotalPrice = (selectedRoom: { room: RoomDto, quantity: number }) => {
        // Calculate the number of nights
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const numberOfNights = Math.round(Math.abs((checkOut.getTime() - checkIn.getTime()) / oneDay));

        // Calculate total price based on price per night and quantity of rooms
        const totalPrice = selectedRoom.room.price * numberOfNights * selectedRoom.quantity;
        
        return { totalPrice, numberOfNights };
    };

    const totalPriceObject = selectedRooms.map(selectedRoom => calculateTotalPrice(selectedRoom));
    const total = totalPriceObject.reduce((acc, curr) => acc + curr.totalPrice, 0);

    return (
        <Container>
            <h1>Reservation Details</h1>
            <Row>
                <Col md={8}>
                    <Row xs={1} md={1} className="g-4">
                        {selectedRooms.map((selectedRoom, index) => {
                            const { totalPrice, numberOfNights } = calculateTotalPrice(selectedRoom);
                            return (
                                <Col key={index}>
                                    <Card style={{ height: '100%' }}>
                                        <Row className="g-0">
                                            <Col md={4}>
                                                <Card.Img src={getRoomImage(selectedRoom.room) ?? ''} alt={selectedRoom.room.beds || ''} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                            </Col>
                                            <Col md={8}>
                                                <Card.Body>
                                                    <Card.Title>{selectedRoom.room.beds}</Card.Title>
                                                    <Card.Text>
                                                        Floor: {selectedRoom.room.floorNumber}<br />
                                                        Check-in Date: {checkIn.toLocaleDateString()}<br />
                                                        Check-out Date: {checkOut.toLocaleDateString()}<br />
                                                        Nights: {numberOfNights}<br />
                                                        Total Price: ${totalPrice}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Price</Card.Title>
                            <Card.Text>
                                <h3>${total}</h3>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
