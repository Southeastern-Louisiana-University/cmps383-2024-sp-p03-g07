import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ReservationDto } from '../../features/reservations/ReservationDto'; // Assuming the correct path to ReservationDto
import Navbar from '../../components/Navbar';

const StayDetails = () => {
    const { reservationNumber } = useParams<{ reservationNumber: string }>();
    const [reservationDetails, setReservationDetails] = useState<ReservationDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReservationDetails = async () => {
            try {
                const response = await fetch(`/api/reservations/${reservationNumber}`);
                if (response.ok) {
                    const data = await response.json();
                    setReservationDetails(data);
                } else {
                    console.error('Failed to fetch reservation details');
                }
            } catch (error) {
                console.error('Error fetching reservation details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservationDetails();
    }, [reservationNumber]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!reservationDetails) {
        return <div>Error: Unable to fetch reservation details</div>;
    }

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
            <h1>Stay Details</h1>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Reservation Details</Card.Title>
                            <Card.Text>
                                <p>Reservation ID: {reservationDetails.id}</p>
                                <p>Check-in Date: {reservationDetails.checkIn.toLocaleDateString()}</p>
                                <p>Check-out Date: {reservationDetails.checkOut.toLocaleDateString()}</p>

                                {/* Add more reservation details as needed */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default StayDetails;
