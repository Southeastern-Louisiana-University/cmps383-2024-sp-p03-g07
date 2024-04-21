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

            if (!roleManager.Roles.Any())
            {
                var roles = new List<Role>
                {
                    new Role { Name = RoleNames.Admin },
                    new Role { Name = RoleNames.User }
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
            }
        }

        private static async Task AddHotels(DataContext dataContext)
        {
            var hotels = dataContext.Set<Hotel>();

            if (!await hotels.AnyAsync())
            {
                var demoHotels = new List<Hotel>
                {
                    new Hotel { Name = "Enstay 1", Address = "225 Baronne St, New Orleans, LA 70112" },
                    new Hotel { Name = "Enstay 2", Address = "405 Esplanade Ave, New Orleans, LA 70116" },
                    new Hotel { Name = "Enstay 3", Address = "200 Convention St, Baton Rouge, LA 70801" }
                };

                await hotels.AddRangeAsync(demoHotels);
            }

            await dataContext.SaveChangesAsync();
        }

        private static async Task AddRoomTypes(DataContext dataContext)
        {
            var roomTypes = dataContext.Set<RoomType>();

            if (!await roomTypes.AnyAsync())
            {
                var demoRoomTypes = new List<RoomType>
        {
            new RoomType { Name = "Double Twin", NumberOfBeds = 2, Price = 200 },
            new RoomType { Name = "Double Queen", NumberOfBeds = 2, Price = 250 },
            new RoomType { Name = "Single King", NumberOfBeds = 1, Price = 225 }
        };

                await roomTypes.AddRangeAsync(demoRoomTypes);
            }

            await dataContext.SaveChangesAsync();
        }


        private static async Task AddRooms(DataContext dataContext)
        {
            var rooms = dataContext.Set<Room>();
            var hotels = await dataContext.Set<Hotel>().ToListAsync();
            var roomTypes = await dataContext.Set<RoomType>().ToListAsync();

            if (!await rooms.AnyAsync())
            {
                var demoRooms = new List<Room>();

                foreach (var hotel in hotels)
                {
                   
                    int roomTypeIndex = 0;

                    for (int floor = 1; floor <= 6; floor++)
                    {
                       
                        var shuffledRoomTypes = roomTypes.OrderBy(x => Guid.NewGuid()).ToList();

                        for (int i = 0; i < 20; i++)
                        {
                            var roomType = shuffledRoomTypes[roomTypeIndex % shuffledRoomTypes.Count];

                            demoRooms.Add(new Room
                            {
                                Beds = roomType.Name,
                                IsAvailable = true,
                                HotelId = hotel.Id,
                                RoomType = roomType,
                                FloorNumber = floor
                            });

                            roomTypeIndex++;
                        }
                    }
                }

                await rooms.AddRangeAsync(demoRooms);
                await dataContext.SaveChangesAsync();
            }
        }




        private static async Task AddReservations(DataContext dataContext, UserManager<User> userManager)
        {
            var reservations = dataContext.Set<Reservation>();

            if (!await reservations.AnyAsync())
            {
                var rooms = await dataContext.Set<Room>()
                    .Include(r => r.Hotel)
                    .ToListAsync();

                var demoUser = await userManager.FindByNameAsync("sue");
                var random = new Random();

                var demoReservations = new List<Reservation>();

                foreach (var hotel in rooms.Select(r => r.Hotel).Distinct())
                {
                    var hotelRooms = rooms.Where(r => r.HotelId == hotel.Id).ToList();

                    for (int i = 0; i < 20; i++)
                    {
                        var room = hotelRooms[random.Next(hotelRooms.Count)];

                        var reservation = new Reservation
                        {
                            CheckIn = DateTime.Today,
                            CheckOut = new DateTime(2024, 5, 20),
                            ReservationNumber = GenerateReservationNumber(),
                            RoomId = room.Id,
                            UserId = demoUser.Id
                        };

                        demoReservations.Add(reservation);

                        // Update room availability
                        room.IsAvailable = false;
                    }
                }

                reservations.AddRange(demoReservations);
                await dataContext.SaveChangesAsync();
            }
        }

        // Method to generate a random reservation number
        private static int GenerateReservationNumber()
        {
            return new Random().Next(1000, 10000);
        }



    }
}


