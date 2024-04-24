import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ReservationDto } from '../../features/reservations/ReservationDto';
import Navbar from '../../components/Navbar';

const StayDetails = () => {
    const [reservations, setReservations] = useState<ReservationDto[]>([]);
    const [loggedInUserId, setLoggedInUserId] = useState<number>(0);

    useEffect(() => {
        async function fetchUserId() {
            try {
                const response = await fetch('/api/authentication/me');
                if (response.ok) {
                    const userData = await response.json();
                    if (userData && userData.id) {
                        const userId = parseInt(userData.id, 10); // Parse the ID as an integer
                        if (!isNaN(userId)) {
                            setLoggedInUserId(userId); // Set the state variable here
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

    const fetchReservations = async () => {
        try {
            const response = await fetch(`/api/reservations/user/${loggedInUserId}`);
            if (response.ok) {
                const reservationsData = await response.json();
    
                // Filter out duplicate reservations based on room number
                const uniqueReservations: ReservationDto[] = [];
                const seenRoomNumbers: Set<string> = new Set();
    
                for (const reservation of reservationsData) {
                    if (!seenRoomNumbers.has(reservation.roomId.toString())) {
                        uniqueReservations.push(reservation);
                        seenRoomNumbers.add(reservation.roomId.toString());
                    }
                }
    
                // Fetch room details for unique reservations
                const reservationsWithRoomDetails = await Promise.all(uniqueReservations.map(async (reservation: ReservationDto) => {
                    try {
                        const roomResponse = await fetch(`/api/rooms/${reservation.roomId}`);
                        if (roomResponse.ok) {
                            const roomData = await roomResponse.json();
                            return { ...reservation, room: roomData };
                        } else {
                            console.error(`Failed to fetch room details for reservation ID ${reservation.id}`);
                            return reservation; // Return reservation without room details
                        }
                    } catch (error) {
                        console.error(`Error fetching room details for reservation ID ${reservation.id}:`, error);
                        return reservation; // Return reservation without room details
                    }
                }));
    
                setReservations(reservationsWithRoomDetails);
            } else {
                console.error('Failed to fetch reservations');
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };
    
    useEffect(() => {
        if (loggedInUserId) {
            fetchReservations();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUserId]);

    return (
        <Container>
            <div className="navbar">
                <Navbar />
            </div>
            <h1 className="mt-5">Stay Details</h1>
            <Row xs={1} md={2} lg={3}>
                {reservations.map((reservation: ReservationDto) => (
                    <Col key={reservation.id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title className="mb-3">Reservation </Card.Title>
                                <Card.Text>
                                    <p className="mb-1">Check-in Date: {new Date(reservation.checkIn).toLocaleDateString()}</p>
                                    <p className="mb-3">Check-out Date: {new Date(reservation.checkOut).toLocaleDateString()}</p>

                                    {reservation.room && (
                                        <>
                                            <p className="mb-1">Room: {reservation.room.roomNumber}</p>
                                            <p className="mb-1">Beds: {reservation.room.beds}</p>
                                        </>
                                    )}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default StayDetails;
