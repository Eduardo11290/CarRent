using System.Text.Json;

namespace CarRent.Backend.Services
{
    //Wrapper class for file operations
    public class FileService : IFileService
    {
        private readonly ILogger<FileService> _logger;

        // ILogger
        public FileService(ILogger<FileService> logger)
        {
            _logger = logger;
        }

        public async Task<T> LoadDataAsync<T>(string filePath)
        {
            try
            {
                if (!File.Exists(filePath))
                {
                    _logger.LogWarning($"Fișierul {filePath} nu a fost găsit. Se returnează default.");
                    return default!;
                }

                var json = await File.ReadAllTextAsync(filePath);
                return JsonSerializer.Deserialize<T>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Eroare la citirea fișierului {filePath}");
                throw; 
            }
        }

        public async Task SaveDataAsync<T>(string filePath, T data)
        {
            try
            {
                var json = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
                await File.WriteAllTextAsync(filePath, json);
                _logger.LogInformation($"Date salvate cu succes în {filePath}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Eroare la scrierea în fișier.");
            }
        }
    }
}