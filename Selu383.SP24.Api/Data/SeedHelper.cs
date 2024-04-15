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

            if (userManager.Users.Any())
            {
                return;
            }

            var adminUser = new User
            {
                UserName = "galkadi"
            };
            await userManager.CreateAsync(adminUser, defaultPassword);
            await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

            var bob = new User
            {
                UserName = "bob"
            };
            await userManager.CreateAsync(bob, defaultPassword);
            await userManager.AddToRoleAsync(bob, RoleNames.User);

            var sue = new User
            {
                UserName = "sue"
            };
            await userManager.CreateAsync(sue, defaultPassword);
            await userManager.AddToRoleAsync(sue, RoleNames.User);
        }

        private static async Task AddRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
            if (roleManager.Roles.Any())
            {
                return;
            }
            await roleManager.CreateAsync(new Role
            {
                Name = RoleNames.Admin
            });

            await roleManager.CreateAsync(new Role
            {
                Name = RoleNames.User
            });
        }

        private static async Task AddHotels(DataContext dataContext)
        {
            var hotels = dataContext.Set<Hotel>();

            if (await hotels.AnyAsync())
            {
                return;
            }


            dataContext.Set<Hotel>()
                .Add(new Hotel
                {
                    Name = "Enstay 1",
                    Address = "225 Baronne St, New Orleans, LA 70112"
                });

            dataContext.Set<Hotel>()
                .Add(new Hotel
                {
                    Name = "Enstay 2",
                    Address = "405 Esplanade Ave, New Orleans, LA 70116"
                });


            dataContext.Set<Hotel>()
                .Add(new Hotel
                {
                    Name = "Enstay 3",
                    Address = "200 Convention St, Baton Rouge, LA 70801"
                });

            await dataContext.SaveChangesAsync();
        }

        private static async Task AddRoomTypes(DataContext dataContext)
        {
            var roomTypes = dataContext.Set<RoomType>();

            if (await roomTypes.AnyAsync())
            {
                return;
            }

            var predefinedRooms = new List<RoomType>
            {
                new RoomType { Name = "Twin Bed", NumberOfBeds = 2},
                new RoomType { Name = "Queen Bed", NumberOfBeds = 2},
                new RoomType { Name = "King Bed", NumberOfBeds = 1}
            };

            await roomTypes.AddRangeAsync(predefinedRooms);
            await dataContext.SaveChangesAsync();
        }

        private static async Task AddRooms(DataContext dataContext)
        {
            var rooms = dataContext.Set<Room>();
            var hotels = await dataContext.Set<Hotel>().ToListAsync();
            var roomTypes = await dataContext.Set<RoomType>().ToListAsync();

            if (await rooms.AnyAsync())
            {
                return;
            }

            foreach (var hotel in hotels)
            {
                for (int floor = 1; floor <= 6; floor++)
                {
                    int roomCount = 0;
                    int roomTypeIndex = 0; // Start with the first room type
                    while (roomCount < 20)
                    {
                        var roomType = roomTypes[roomTypeIndex];
                        rooms.Add(new Room
                        {
                            Beds = roomType.Name,
                            IsAvailable = true,
                            HotelId = hotel.Id,
                            RoomType = roomType, // Set the RoomType
                            FloorNumber = floor // Set the floor number
                        });

                        roomCount++;
                        roomTypeIndex = (roomTypeIndex + 1) % roomTypes.Count; // Move to the next room type, looping back to the start if necessary
                    }
                }
            }

            await dataContext.SaveChangesAsync();
        }



        private static async Task AddReservations(DataContext dataContext, UserManager<User> userManager)
        {
            var reservations = dataContext.Set<Reservation>();

            if (await reservations.AnyAsync())
            {
                return;
            }

            var rooms = await dataContext.Set<Room>()
                .Include(r => r.Hotel)
                .ToListAsync();

            var testUser = await userManager.FindByNameAsync("sue");

            var room = rooms.FirstOrDefault();

            if (room != null)
            {
                var checkIn = DateTime.Today.AddDays(1);
                var checkOut = checkIn.AddDays(10);

                var reservation = new Reservation
                {
                    CheckIn = checkIn,
                    CheckOut = checkOut,
                    ReservationNumber = 1234,
                    Room = room,
                    RoomId = room.Id,
                    HotelName = room.Hotel?.Name,
                    UserId = testUser.Id
                };

                reservations.Add(reservation);
                await dataContext.SaveChangesAsync();
            }
        }
    }
}


