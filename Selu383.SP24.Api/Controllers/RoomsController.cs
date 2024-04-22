using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.Rooms;

namespace Selu383.SP24.Api.Controllers
{
    [Route("api/rooms")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly DbSet<Room> rooms;
        private readonly DataContext dataContext;
        private readonly DbSet<Hotel> hotels;

        public RoomsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
            rooms = dataContext.Set<Room>();
        }

        [HttpGet]
        public IQueryable<RoomDto> GetAllRooms()
        {
            return GetRoomDtos(rooms);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<RoomDto> GetRoomById(int id)
        {
            var result = GetRoomDtos(rooms.Where(x => x.Id == id)).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("byhotel/{hotelId}")]
        public ActionResult<IQueryable<RoomDto>> GetRoomsByHotel(int hotelId)
        {
            var hotelRooms = rooms.Where(x => x.HotelId == hotelId);
            if (!hotelRooms.Any())
            {
                return NotFound();
            }

            return Ok(GetRoomDtos(hotelRooms));
        }
      



        private IQueryable<RoomDto> GetRoomDtos(IQueryable<Room> rooms)
        {
            return rooms
                .Include(x => x.RoomType)
                .Select(x => new RoomDto
                {
                    Id = x.Id,
                    Beds = x.Beds,
                    IsAvailable = x.IsAvailable,
                    HotelId = x.HotelId,
                    HotelName = x.Hotel.Name,
                    FloorNumber = x.FloorNumber,
                    Price = x.RoomType.Price
                });
        }

    }
}