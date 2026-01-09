namespace CarRent.Backend.Models
{
    public class Booking
    {
        public string Id { get; set; } = Guid.NewGuid().ToString(); 
        public string CarId { get; set; } = string.Empty;
        public string CarName { get; set; } = string.Empty;
        public string StartDate { get; set; } = string.Empty;
        public string EndDate { get; set; } = string.Empty;
        public int Days { get; set; }
        public decimal TotalCost { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}