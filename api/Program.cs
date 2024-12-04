using api.Contracts;
using api.Models.Config;
using api.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Health Track API", Version = "v1" });
});

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("OpenCorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Add ICosmosDbService singleton to the service container
builder.Services.AddSingleton<ICosmosDbService, CosmosDbService>(serviceProvider =>
{
    var configuration = serviceProvider.GetRequiredService<IConfiguration>();
    var connectionString = configuration["ConnectionStrings:HealthTrackDB"];
    var databaseName = configuration["DatabaseName"];
    var cosmosDbSettings = new CosmosDbSettings { ConnectionString = connectionString, DatabaseName = databaseName };
    return new CosmosDbService(cosmosDbSettings);
});

var nutritionixApiConfig = builder.Configuration.GetSection("NutritionixApi").Get<NutritionixApiConfig>();
builder.Services.AddHttpClient(nameof(ThirdPartyApiService), client =>
{
    client.BaseAddress = new Uri(nutritionixApiConfig.BaseUrl);
    client.DefaultRequestHeaders.Add("x-app-id", nutritionixApiConfig.AppId);
    client.DefaultRequestHeaders.Add("x-app-key", nutritionixApiConfig.ApiKey);
});

// Register third party api adapter
builder.Services.AddSingleton<IFoodApiAdapter, ThirdPartyApiService>();
builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddSingleton<ILogRepository, LogRepository>();
builder.Services.AddSingleton<IGoalRepository, GoalRepository>();

// Add Activity and Nutrition Logging services
builder.Services.AddSingleton<ILogFactory, ConcreteActivityLogFactory>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Health Track API V1");
        c.DocumentTitle = "Health Track API Documentation";
    });
}

app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.UseHttpsRedirection();

app.Run();