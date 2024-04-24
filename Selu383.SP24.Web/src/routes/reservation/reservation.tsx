import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button, Form } from 'react-bootstrap';
import twins from '../../assets/twins.jpg';
import queen from '../../assets/queens.jpg';
import king from '../../assets/king.jpg';
import { RoomDto } from '../../features/rooms/RoomDto';
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';

const Reservation: React.FC = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const selectedRooms: { room: RoomDto, quantity: number }[] = JSON.parse(params.get('selectedRooms') || '[]');
    const checkIn = new Date(params.get('checkIn')!);
    const checkOut = new Date(params.get('checkOut')!);
    const [loggedInUserId, setLoggedInUserId] = useState<number>();
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [isCardValid, setIsCardValid] = useState(false);

    useEffect(() => {
        async function fetchUserId() {
            try {
                const response = await fetch('/api/authentication/me');
                if (response.ok) {
                    const userData = await response.json();
                    if (userData && userData.id) {
                        const userId = parseInt(userData.id, 10);
                        if (!isNaN(userId)) {
                            setLoggedInUserId(userId);
                            console.log('Logged in user ID:', userId);
                        } else {
                            console.error('Invalid user ID:', userData.id);
                        }
                    }
                } else {
                    console.error('Failed to fetch user ID');
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        }
        fetchUserId();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleReserveButtonClick = async () => {
        try {
            if (!isCardValid) {
                console.error('Please enter valid card details.');
                return;
            }
            for (const selectedRoom of selectedRooms) {
                await reserveRoom(selectedRoom.room.id);
            }
            window.location.href = '/staydetails';
        } catch (error) {
            console.error('Error during reservation:', error);
        }
    };

    const reserveRoom = async (roomId: number) => {
        try {
            if (!checkIn || !checkOut || !loggedInUserId) {
                return;
            }

            const reservationDto = {
                checkIn: checkIn.toISOString(),
                checkOut: checkOut.toISOString(),
                roomId: roomId,
                userId: loggedInUserId
            };

            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationDto),
            });

            if (!response.ok) {
                console.error(`Failed to reserve room ${roomId}:`, response.statusText);
            }
        } catch (error) {
            console.error('Error during reservation:', error);
        }
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

    const calculateTotalPrice = (selectedRoom: { room: RoomDto, quantity: number }) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const numberOfNights = Math.round(Math.abs((checkOut.getTime() - checkIn.getTime()) / oneDay));
        const totalPrice = selectedRoom.room.price * numberOfNights * selectedRoom.quantity;
        return { totalPrice, numberOfNights };
    };

    const totalPriceObject = selectedRooms.map(selectedRoom => calculateTotalPrice(selectedRoom));
    const total = totalPriceObject.reduce((acc, curr) => acc + curr.totalPrice, 0);

    const validateCardDetails = () => {
        // Card number should have 16 digits, CVV should have 3 digits, and expiry date should be in MM/YYYY format
        const isCardNumberValid = /^\d{16}$/.test(cardDetails.cardNumber.trim());
        const isCVVValid = /^\d{3}$/.test(cardDetails.cvv.trim());
        const isExpiryDateValid = /^(0[1-9]|1[0-2])\/\d{4}$/.test(cardDetails.expiryDate.trim());
        setIsCardValid(isCardNumberValid && isCVVValid && isExpiryDateValid);
    };

    useEffect(() => {
        validateCardDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardDetails]);

    return (
        <Container>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="<KEY>"
                crossOrigin="anonymous"
            ></link>
            <div className="navbar">
                <Navbar />
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
                                                        Room: {selectedRoom.room.roomNumber}<br />
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
                                <Form>
                                    <Form.Group controlId="cardNumber">
                                        <Form.Label>Card Number</Form.Label>
                                        <Form.Control type="text" name="cardNumber" value={cardDetails.cardNumber} onChange={handleInputChange} placeholder="Enter 16-digit card number" />
                                    </Form.Group>
                                    <Form.Group controlId="expiryDate">
                                        <Form.Label>Expiration Date (MM/YYYY)</Form.Label>
                                        <Form.Control type="text" name="expiryDate" value={cardDetails.expiryDate} onChange={handleInputChange} placeholder="MM/YYYY" />
                                    </Form.Group>
                                    <Form.Group controlId="cvv">
                                        <Form.Label>CVV</Form.Label>
                                        <Form.Control type="text" name="cvv" value={cardDetails.cvv} onChange={handleInputChange} placeholder="Enter 3-digit CVV" />
                                    </Form.Group>
                                </Form>
                                <Button variant="primary" onClick={handleReserveButtonClick} disabled={!isCardValid}>
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

export default Reservation;
