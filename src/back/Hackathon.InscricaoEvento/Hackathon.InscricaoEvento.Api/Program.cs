using FluentValidation;
using Hackathon.InscricaoEvento.Application.DTOs;
using Hackathon.InscricaoEvento.Application.Handlers;
using Hackathon.InscricaoEvento.Application.Validators;
using Hackathon.InscricaoEvento.Domain.Interfaces;
using Hackathon.InscricaoEvento.Infrastructure.Repositories;
using Hackathon.InscricaoEvento.Infrastructure.Services;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registrar validadores
builder.Services.AddScoped<IValidator<CadastrarEventoDto>, CadastrarEventoDtoValidator>();
builder.Services.AddScoped<IValidator<RealizarMatriculaDto>, RealizarMatriculaDtoValidator>();

builder.Services.AddScoped<EventoSeedService>();


// Registrar handlers
builder.Services.AddScoped<CadastrarEventoHandler>();
builder.Services.AddScoped<ListarEventosHandler>();
builder.Services.AddScoped<RealizarMatriculaHandler>();
builder.Services.AddScoped<ListarMatriculasHandler>();

// Registrar reposit�rios
builder.Services.AddSingleton<IEventoRepository, EventoRepositoryInMemory>();
builder.Services.AddSingleton<IMatriculaRepository, MatriculaRepositoryInMemory>();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin() // Permite qualquer origem
                  .AllowAnyMethod()   // Permite qualquer método HTTP (GET, POST, etc.)
                  .AllowAnyHeader();  // Permite qualquer cabeçalho na requisição
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// Habilitar Swagger em Development ou quando ENABLE_SWAGGER=true
if (app.Environment.IsDevelopment() || 
    app.Configuration.GetValue<bool>("ENABLE_SWAGGER", false))
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Hackathon.InscricaoEvento.Api v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

// Endpoint de sa�de para health check
app.MapGet("/health", () => Results.Ok(new
{
    Status = "Healthy",
    Timestamp = DateTime.UtcNow,
    Service = "Hackathon.InscricaoEvento.Api"
}))
.WithName("Health")
.WithTags("Health");

// Endpoints da API
app.MapPost("/eventos", async (
    CadastrarEventoDto dto,
    IValidator<CadastrarEventoDto> validator,
    CadastrarEventoHandler handler) =>
{
    var validationResult = await validator.ValidateAsync(dto);
    if (!validationResult.IsValid)
    {
        return Results.BadRequest(validationResult.Errors);
    }

    var eventoId = await handler.ExecutarAsync(dto);
    return Results.Created($"/eventos/{eventoId}", new { Id = eventoId });
})
.WithName("CadastrarEvento")
.WithTags("Eventos");

app.MapGet("/eventos", async (
    ListarEventosHandler handler) =>
{
    var eventos = await handler.ExecutarAsync();
    return Results.Ok(eventos);
})
.WithName("ListarEventos")
.WithTags("Eventos");

app.MapPost("/matriculas", async (
    RealizarMatriculaDto dto,
    IValidator<RealizarMatriculaDto> validator,
    RealizarMatriculaHandler handler) =>
{
    var validationResult = await validator.ValidateAsync(dto);
    if (!validationResult.IsValid)
    {
        return Results.BadRequest(validationResult.Errors);
    }

    try
    {
        var matriculaId = await handler.ExecutarAsync(dto);
        return matriculaId is not null 
            ? Results.Created($"/matriculas/{matriculaId}", new { Id = matriculaId })
            : Results.NotFound(new { Mensagem = "Evento n�o encontrado" });
    }
    catch (InvalidOperationException ex)
    {
        return Results.BadRequest(new { Mensagem = ex.Message });
    }
})
.WithName("RealizarMatricula")
.WithTags("Matriculas");

app.MapGet("/matriculas/{codigoAluno}", async (
    string codigoAluno,
    ListarMatriculasHandler handler) =>
{
    var matriculas = await handler.ExecutarAsync(codigoAluno);
    return Results.Ok(matriculas);
})
.WithName("ListarMatriculasPorAluno")
.WithTags("Matriculas");

// Executar seed de projetos na inicialização
using (var scope = app.Services.CreateScope())
{
    var seedService = scope.ServiceProvider.GetRequiredService<EventoSeedService>();
    await seedService.SeedAsync();
}

app.Run();
