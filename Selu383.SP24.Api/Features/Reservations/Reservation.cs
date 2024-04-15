using Microsoft.VisualBasic;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.Rooms;

namespace Selu383.SP24.Api.Features.Reservations
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public int ReservationNumber { get; set; }
        public int RoomId { get; set; }
        public Room? Room { get; set; }
        public string? HotelName { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }

        public virtual ICollection<User>? Users { get; set; }
        public virtual ICollection<Hotel>? Hotels { get; set; }
    }
}