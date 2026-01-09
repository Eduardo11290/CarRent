using Microsoft.AspNetCore.Mvc;
using CarRent.Backend.Services;
using CarRent.Backend.Models;

namespace CarRent.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IWebHostEnvironment _env;

        public CarsController(IFileService fileService, IWebHostEnvironment env)
        {
            _fileService = fileService;
            _env = env;
        }

        // Method 1: Return ALL cars (already implemented)
        [HttpGet]
        public async Task<IActionResult> GetAllCars()
        {
            var path = Path.Combine(_env.ContentRootPath, "Data", "cars.json");
            var data = await _fileService.LoadDataAsync<List<CarCategory>>(path);
            
            if (data == null) return NotFound("Nu s-au găsit mașini.");
            
            return Ok(data);
        }

        // --- ADD NEW CODE HERE (Method 2: Find by ID) ---
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCarById(string id)
        {
            // 1. Define the path to the file (needed here too)
            var path = Path.Combine(_env.ContentRootPath, "Data", "cars.json");

            // 2. Load the data
            var categories = await _fileService.LoadDataAsync<List<CarCategory>>(path);
            
            if (categories == null) return NotFound("Eroare la citirea datelor.");
            // 3. Search for the car by ID across all categories
            var car = categories
                .SelectMany(c => c.Cars)
                .Where(c => c.Id == id)
                .FirstOrDefault();

            if (car == null) return NotFound("Mașina nu există.");
            
            return Ok(car);
        }
        // -------------------------------------------------------
    }
}