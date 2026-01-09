using CarRent.Backend.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Configure dependencies (Generic Host)
// Register our services (Dependency Injection)
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register our file wrapper service
builder.Services.AddSingleton<IFileService, FileService>();

// Configure CORS (allow the React frontend on port 5173 to request data)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // Your frontend port
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// 2. Configure request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run(); // Run the application (main loop)