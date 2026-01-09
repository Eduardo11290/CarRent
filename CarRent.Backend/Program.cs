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
// ACTUALIZAT: Am schimbat politica pentru a permite accesul de oriunde (Vercel + Localhost)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()  // Permite conexiunea de oriunde (Vercel, Localhost, etc.)
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

// 2. Configure request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Folosim politica "AllowAll" definită mai sus
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run(); // Run the application (main loop)