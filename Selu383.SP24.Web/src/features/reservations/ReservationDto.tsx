export interface ReservationDto {
    id: number;
    checkIn: Date;
    checkOut: Date;
    reservationNumber: number;
    hotelName?: string | null;
    roomId: number;
    userId: number;
}