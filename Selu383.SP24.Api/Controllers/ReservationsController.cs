using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Reservations;
using Selu383.SP24.Api.Features.Rooms;

namespace Selu383.SP24.Api.Controllers
{
    [Route("api/reservations")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly DbSet<Reservation> reservations;
        private readonly DataContext dataContext;

        public ReservationsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
            this.reservations = dataContext.Set<Reservation>();
        }

        [HttpGet]
        public IQueryable<ReservationDto> GetAllReservations()
        {
            return GetReservationDtos(reservations);
        }

        [HttpGet("{id}")]
        public ActionResult<ReservationDto> GetReservationById(int id)
        {
            var result = GetReservationDtos(reservations.Where(x => x.Id == id)).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("reservation/{reservationNumber}")]
        public ActionResult<ReservationDto> GetReservationByReservationNumber(int reservationNumber)
        {
            var reservation = reservations.FirstOrDefault(x => x.ReservationNumber == reservationNumber);
            if (reservation == null)
            {
                return NotFound();
            }

            var reservationDto = new ReservationDto
            {
                Id = reservation.Id,
                CheckIn = reservation.CheckIn,
                CheckOut = reservation.CheckOut,
                ReservationNumber = reservation.ReservationNumber,
                RoomId = reservation.RoomId,
                HotelName = reservation.HotelName,
                UserId = reservation.UserId
            };

            return Ok(reservationDto);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetReservationsByUserId(int userId)
        {
            var userReservations = reservations
                .Include(r => r.Room) 
                .Where(x => x.UserId == userId)
                .ToList();

            if (userReservations.Count == 0)
            {
                return NotFound("No reservations found for the user.");
            }

            var reservationDtos = userReservations.Select(x => new ReservationDto
            {
                Id = x.Id,
                CheckIn = x.CheckIn,
                CheckOut = x.CheckOut,
                ReservationNumber = x.ReservationNumber,
                RoomId = x.RoomId,
                HotelName = x.HotelName,
                UserId = x.UserId,
                Room = new RoomDto 
                {
                  
                    Id = x.Room.Id,
                  
                }
            });

            return Ok(reservationDtos);
        }

        [HttpPost]
        public ActionResult<ReservationDto> CreateReservation(ReservationDto dto)
        {
            if (IsInvalid(dto))
            {
                return BadRequest();
            }

            var reservation = new Reservation
            {
                CheckIn = dto.CheckIn,
                CheckOut = dto.CheckOut,
                ReservationNumber = dto.ReservationNumber,
                HotelName = dto.HotelName,
                RoomId = dto.RoomId,
                UserId = dto.UserId
            };
            reservations.Add(reservation);

            dataContext.SaveChanges();

            dto.Id = reservation.Id;

            return CreatedAtAction(nameof(GetReservationById), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        [Authorize]
        public ActionResult<ReservationDto> UpdateReservation(int id, ReservationDto dto)
        {
            if (IsInvalid(dto))
            {
                return BadRequest();
            }

            var reservation = reservations.FirstOrDefault(x => x.Id == id);
            if (reservation == null)
            {
                return NotFound();
            }

            dataContext.SaveChanges();

            dto.Id = reservation.Id;

            return Ok(dto);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult DeleteReservation(int id)
        {
            var reservation = reservations.FirstOrDefault(x => x.Id == id);
            if (reservation == null)
            {
                return NotFound();
            }

            dataContext.SaveChanges();

            return Ok();
        }

        private bool IsInvalid(ReservationDto dto)
        {
            return false;
        }

        private static IQueryable<ReservationDto> GetReservationDtos(IQueryable<Reservation> reservations)
        {
            return reservations
                .Select(x => new ReservationDto
                {
                    Id = x.Id,
                    CheckIn = x.CheckIn,
                    CheckOut = x.CheckOut,
                    ReservationNumber = x.ReservationNumber,
                    RoomId = x.RoomId,
                    HotelName = x.HotelName,
                    UserId = x.UserId,
                });
        }
    }
}