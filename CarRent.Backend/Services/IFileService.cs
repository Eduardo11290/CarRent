namespace CarRent.Backend.Services
{
    // Interface enables Dependency Injection and testing (bonus requirement)
    public interface IFileService
    {
        Task SaveDataAsync<T>(string filePath, T data);
        Task<T> LoadDataAsync<T>(string filePath);
    }
}