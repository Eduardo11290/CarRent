namespace CarRent.Backend.Models
{
    // Abstractizare
    public abstract class Vehicle
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Cost { get; set; }
        public string Description { get; set; } = string.Empty;
        
        // Polimorfism
        public virtual string GetSummary()
        {
            return $"{Name} - {Cost} EUR/zi";
        }
    }
}