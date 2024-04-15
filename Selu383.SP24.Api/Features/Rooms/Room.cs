using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.Reservations;

namespace Selu383.SP24.Api.Features.Rooms
{
    public class Room
    {
        public int Id { get; set; }
        public int? HotelId { get; set; }
        public int? RoomTypeId { get; set; }
        public string Beds { get; set; }

        public bool IsAvailable { get; set; }

        public int FloorNumber { get; set; }
        public virtual Hotel Hotel { get; set; }

        public virtual RoomType RoomType { get; set; }

        public virtual ICollection<Reservation>? Reservations { get; set; }
    }
}