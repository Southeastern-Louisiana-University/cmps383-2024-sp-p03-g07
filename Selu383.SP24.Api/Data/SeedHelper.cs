using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.Reservations;
using Selu383.SP24.Api.Features.Rooms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Selu383.SP24.Api.Data
{
    public static class SeedHelper
    {
        public static async Task MigrateAndSeed(IServiceProvider serviceProvider)
        {
            var dataContext = serviceProvider.GetRequiredService<DataContext>();
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

            await dataContext.Database.MigrateAsync();

            await AddRoles(serviceProvider);
            await AddUsers(serviceProvider);
            await AddHotels(dataContext);
            await AddRoomTypes(dataContext);
            await AddRooms(dataContext);
            await AddReservations(dataContext, userManager);
        }

        private static async Task AddUsers(IServiceProvider serviceProvider)
        {
            const string defaultPassword = "Password123!";
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

            if (!userManager.Users.Any())
            {
                var users = new List<User>
                {
                    new User { UserName = "galkadi" },
                    new User { UserName = "bob" },
                    new User { UserName = "sue" }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, defaultPassword);
                    if (user.UserName == "galkadi")
                        await userManager.AddToRoleAsync(user, RoleNames.Admin);
                    else
                        await userManager.AddToRoleAsync(user, RoleNames.User);
                }
            }
        }

        private static async Task AddRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();

            var demoRoles = new List<Role>
    {
        new Role { Name = RoleNames.Admin },
        new Role { Name = RoleNames.User }
    };

            foreach (var demoRole in demoRoles)
            {
                var existingRole = await roleManager.FindByNameAsync(demoRole.Name);
                if (existingRole != null)
                {
                    await roleManager.DeleteAsync(existingRole);
                }
                await roleManager.CreateAsync(demoRole);
            }
        }

        private static async Task AddHotels(DataContext dataContext)
        {
            var hotels = dataContext.Set<Hotel>();

            var demoHotels = new List<Hotel>
    {
        new Hotel { Name = "Enstay 1", Address = "225 Baronne St, New Orleans, LA 70112" },
        new Hotel { Name = "Enstay 2", Address = "405 Esplanade Ave, New Orleans, LA 70116" },
        new Hotel { Name = "Enstay 3", Address = "200 Convention St, Baton Rouge, LA 70801" }
    };

            foreach (var demoHotel in demoHotels)
            {
                var existingHotel = await hotels.FirstOrDefaultAsync(h => h.Name == demoHotel.Name);
                if (existingHotel != null)
                {
                    dataContext.Remove(existingHotel);
                }
                await hotels.AddAsync(demoHotel);
            }

            await dataContext.SaveChangesAsync();
        }

        private static async Task AddRoomTypes(DataContext dataContext)
        {
            var roomTypes = dataContext.Set<RoomType>();

            var demoRoomTypes = new List<RoomType>
    {
        new RoomType { Name = "Double Twin", NumberOfBeds = 2, Price = 200 },
        new RoomType { Name = "Double Queen", NumberOfBeds = 2, Price = 250 },
        new RoomType { Name = "Single King", NumberOfBeds = 1, Price = 225 }
    };

            foreach (var demoRoomType in demoRoomTypes)
            {
                var existingRoomType = await roomTypes.FirstOrDefaultAsync(rt => rt.Name == demoRoomType.Name);
                if (existingRoomType != null)
                {
                    dataContext.Remove(existingRoomType);
                }
                await roomTypes.AddAsync(demoRoomType);
            }

            await dataContext.SaveChangesAsync();
        }


        private static async Task AddRooms(DataContext dataContext)
        {
            var rooms = dataContext.Set<Room>();
            var hotels = await dataContext.Set<Hotel>().ToListAsync();
            var roomTypes = await dataContext.Set<RoomType>().ToListAsync();

            var demoRooms = new List<Room>();

            foreach (var hotel in hotels)
            {
                for (int floor = 1; floor <= 6; floor++)
                {
                    int roomNumber = floor * 100 + 1; 

                    var shuffledRoomTypes = roomTypes.OrderBy(x => Guid.NewGuid()).ToList();

                    for (int i = 0; i < 20; i++)
                    {
                        var roomType = shuffledRoomTypes[i % shuffledRoomTypes.Count];

                        var existingRoom = await rooms.FirstOrDefaultAsync(r => r.HotelId == hotel.Id && r.Beds == roomType.Name && r.FloorNumber == floor);
                        if (existingRoom != null)
                        {
                            dataContext.Remove(existingRoom);
                        }

                        demoRooms.Add(new Room
                        {
                            Beds = roomType.Name,
                            IsAvailable = true,
                            HotelId = hotel.Id,
                            RoomType = roomType,
                            FloorNumber = floor,
                            RoomNumber = roomNumber
                        });

                        roomNumber++; 
                    }
                }
            }

            await rooms.AddRangeAsync(demoRooms);
            await dataContext.SaveChangesAsync();
        }





        private static async Task AddReservations(DataContext dataContext, UserManager<User> userManager)
        {
            var reservations = dataContext.Set<Reservation>();
            var demoUser = await userManager.FindByNameAsync("sue");
            var random = new Random();

            var hotels = await dataContext.Set<Hotel>()
                .Include(h => h.Rooms)
                .ToListAsync();

            foreach (var hotel in hotels)
            {
           
                var hotelReservations = await reservations
                    .Where(r => r.Room.HotelId == hotel.Id && r.UserId == demoUser.Id)
                    .ToListAsync();

            
                reservations.RemoveRange(hotelReservations);

                foreach (var room in hotel.Rooms)
                {
                    room.IsAvailable = true; 
                }

         
                await dataContext.SaveChangesAsync();

               
                var availableRooms = hotel.Rooms.Where(r => r.IsAvailable).ToList();

               
                var reservationCount = Math.Min(5, availableRooms.Count);

                for (int i = 0; i < reservationCount; i++)
                {
                    var randomRoomIndex = random.Next(0, availableRooms.Count);
                    var room = availableRooms[randomRoomIndex];

                    var reservation = new Reservation
                    {
                        CheckIn = DateTime.Today,
                        CheckOut = DateTime.Today.AddDays(30), 
                        ReservationNumber = GenerateReservationNumber(random),
                        RoomId = room.Id,
                        UserId = demoUser.Id
                    };

                    reservations.Add(reservation);

                 
                    room.IsAvailable = false;
                    availableRooms.RemoveAt(randomRoomIndex);
                }
            }

            await dataContext.SaveChangesAsync();
        }



        private static int GenerateReservationNumber(Random random)
        {
            return random.Next(1000, 10000);
        }




    }
}


