import { useLocation } from 'react-router-dom';
import { Card, Col, Container, Row, Button, } from 'react-bootstrap';
import twins from '../../assets/twins.jpg';
import queen from '../../assets/queens.jpg';
import king from '../../assets/king.jpg';
import { RoomDto } from '../../features/rooms/RoomDto';
import Navbar from '../../components/Navbar';

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

    const reserveRoom = async () => {
        try {
            // Make a POST request to your API endpoint with reservation data
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    CheckIn: checkIn,
                    CheckOut: checkOut,
                    // You might need to adjust this part based on how you retrieve RoomId and UserId
                    RoomId: selectedRooms[0].room.id, // Assuming there's only one room selected
                    UserId: 1 // Replace with the actual user ID
                })
            });
            // Handle response
            if (response.ok) {
                // Reservation successful, maybe show a success message or navigate to another page
                console.log('Reservation successful');
                // Navigate to Stay Details page
                window.location.href = '/staydetails';
            } else {
                // Reservation failed, handle error
                console.error('Reservation failed');
            }
        } catch (error) {
            // Handle error if needed
            console.error('Error during reservation:', error);
        }
    };

    const totalPriceObject = selectedRooms.map(selectedRoom => calculateTotalPrice(selectedRoom));
    const total = totalPriceObject.reduce((acc, curr) => acc + curr.totalPrice, 0);

    return (
        
        <Container>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="<KEY>"
                crossOrigin="anonymous"
            ></link>
            <div className="navbar">
                <Navbar/>
            </div>
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
                                <Button variant="primary" onClick={reserveRoom}>
                                    Reserve Room
                                </Button>
                                
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
