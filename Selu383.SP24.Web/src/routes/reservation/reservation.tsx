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
    const checkIn = params.get('checkIn') ? new Date(params.get('checkIn')!) : undefined;
    const checkOut = params.get('checkOut') ? new Date(params.get('checkOut')!) : undefined;

    const getRoomImage = (room: RoomDto) => {
        if (room.beds === 'Double Twin') {
            return twins;
        } else if (room.beds === 'Double Queen') {
            return queen;
        } else if (room.beds === 'Single King') {
            return king;
        } else {
            // Default image if the bed type is not recognized
            return null;
        }
    };

    return (
        <Container>
            <h1>Reservation Details</h1>
            <Row xs={1} md={3} className="g-4">
                {selectedRooms.map((selectedRoom, index) => (
                    <Col key={index}>
                        <Card style={{ height: '100%' }}>
                            <Row className="g-0">
                                <Col md={4}>
                                    <Card.Img src={getRoomImage(selectedRoom.room) } alt={selectedRoom.room.beds} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title>{selectedRoom.room.beds}</Card.Title>
                                        <Card.Text>
                                            Room ID: {selectedRoom.room.id}<br />
                                            Type: {selectedRoom.room.beds}<br />
                                            Check-in Date: {checkIn?.toLocaleDateString()}<br />
                                            Check-out Date: {checkOut?.toLocaleDateString()}
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

