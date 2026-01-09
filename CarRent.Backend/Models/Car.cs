namespace CarRent.Backend.Models
{
    // Inheritance: Car is a Vehicle
    public class Car : Vehicle
    {
        public List<string> Images { get; set; } = new();
        
        // Composition: Car has Specs and Features
        public CarSpecs Specs { get; set; } = new();
        public CarFeatures Features { get; set; } = new();

        public override string GetSummary()
        {
            return $"{base.GetSummary()} [An: {Specs.Year}, Combustibil: {Specs.Fuel}]";
        }
    }

    public class CarSpecs
    {
        public string Transmission { get; set; } = string.Empty;
        public string Fuel { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
        public string Engine { get; set; } = string.Empty;
        public string Power { get; set; } = string.Empty;
    }

    public class CarFeatures
    {
        public List<string> Audio { get; set; } = new();
        public List<string> Comfort { get; set; } = new();
        public List<string> Safety { get; set; } = new();
    }
    
    // Structure to match the frontend data format
    public class CategoryWrapper
    {
        public string Category { get; set; } = string.Empty;
        public List<Car> Cars { get; set; } = new();
    }
}