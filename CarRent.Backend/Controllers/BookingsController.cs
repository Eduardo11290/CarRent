using Microsoft.AspNetCore.Mvc;
using CarRent.Backend.Services;
using CarRent.Backend.Models;

namespace CarRent.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IWebHostEnvironment _env;
        private readonly string _filePath;

        public BookingsController(IFileService fileService, IWebHostEnvironment env)
        {
            _fileService = fileService;
            _env = env;
            // Path where the bookings file will be saved
            _filePath = Path.Combine(_env.ContentRootPath, "Data", "bookings.json");
        }

        // Receives a booking from React and saves it
        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] Booking booking)
        {
            // 1. Load existing bookings
            var existingBookings = await _fileService.LoadDataAsync<List<Booking>>(_filePath) ?? new List<Booking>();

            // 2. Add the new booking
            existingBookings.Add(booking);

            // 3. Save the updated list back to the file
            await _fileService.SaveDataAsync(_filePath, existingBookings);

            return Ok(new { message = "Rezervare salvată cu succes!", bookingId = booking.Id });
        }

        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            var bookings = await _fileService.LoadDataAsync<List<Booking>>(_filePath) ?? new List<Booking>();
            return Ok(bookings);
        }
    }
}