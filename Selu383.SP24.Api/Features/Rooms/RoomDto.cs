using Selu383.SP24.Api.Features.Hotels;

namespace Selu383.SP24.Api.Features.Rooms
{
    public class RoomDto
    {
        public int Id { get; set; }
        public int? HotelId { get; set; }
        public string? Beds { get; set; }
        public string? HotelName { get; set; }
        public bool IsAvailable { get; set; }
        public int FloorNumber { get; set; }
    }
}