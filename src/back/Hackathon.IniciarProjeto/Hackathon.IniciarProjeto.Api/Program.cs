using FluentValidation;
using Hackathon.IniciarProjeto.Application.DTOs;
using Hackathon.IniciarProjeto.Application.Handlers;
using Hackathon.IniciarProjeto.Application.Validators;
using Hackathon.IniciarProjeto.Domain.Events;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Hackathon.IniciarProjeto.Infrastructure.EventHandlers;
using Hackathon.IniciarProjeto.Infrastructure.Events;
using Hackathon.IniciarProjeto.Infrastructure.Repositories;
using Hackathon.IniciarProjeto.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registrar validadores
builder.Services.AddScoped<IValidator<ImportarProjetoDto>, ImportarProjetoDtoValidator>();
builder.Services.AddScoped<IValidator<AtualizarProjetoDto>, AtualizarProjetoDtoValidator>();

// Registrar handlers
builder.Services.AddScoped<IniciarProjetoHandler>();
builder.Services.AddScoped<AtualizarStatusHandler>();
builder.Services.AddScoped<AtualizarProjetoHandler>();
builder.Services.AddScoped<AdicionarDocumentoHandler>();
builder.Services.AddScoped<ObterProjetoHandler>();
builder.Services.AddScoped<ListarProjetosHandler>();

// Registrar repositórios
builder.Services.AddSingleton<IProjetoRepository, ProjetoRepositoryInMemory>();
builder.Services.AddSingleton<IRubricaRepository, RubricaRepositoryInMemory>();

// Registrar serviços de infraestrutura
builder.Services.AddScoped<IEmailService, EmailServiceSimulado>();
builder.Services.AddScoped<IEventPublisher, LocalEventPublisher>();

// Registrar event handlers
builder.Services.AddScoped<IEventHandler<ProjetoCadastradoEvent>, EnviarEmailCoordenadorHandler>();
builder.Services.AddScoped<IEventHandler<ProjetoStatusAtualizadoEvent>, LogarStatusAtualizadoHandler>();
builder.Services.AddScoped<IEventHandler<ProjetoAtualizadoEvent>, LogarProjetoAtualizadoHandler>();
builder.Services.AddScoped<IEventHandler<DocumentoAdicionadoEvent>, LogarDocumentoAdicionadoHandler>();


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin() // Allows requests from any origin
              .AllowAnyHeader()  // Allows any HTTP header
              .AllowAnyMethod(); // Allows any HTTP method (GET, POST, PUT, DELETE, etc.)
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
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Hackathon.IniciarProjeto.Api v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors();

app.UseHttpsRedirection();

// Endpoint de saúde para health check
app.MapGet("/health", () => Results.Ok(new
{
    Status = "Healthy",
    Timestamp = DateTime.UtcNow,
    Service = "Hackathon.IniciarProjeto.Api"
}))
.WithName("Health")
.WithTags("Health");

// Endpoints da API
app.MapPost("/projetos", async (
    ImportarProjetoDto dto,
    IValidator<ImportarProjetoDto> validator,
    IniciarProjetoHandler handler) =>
{
    var validationResult = await validator.ValidateAsync(dto);
    if (!validationResult.IsValid)
    {
        return Results.BadRequest(validationResult.Errors);
    }

    var projetoId = await handler.ExecutarAsync(dto);
    return Results.Created($"/projetos/{projetoId}", new { Id = projetoId });
})
.WithName("CadastrarProjeto")
.WithTags("Projetos");

app.MapGet("/projetos", async (ListarProjetosHandler handler) =>
{
    var projetos = await handler.ExecutarAsync();
    return Results.Ok(projetos);
})
.WithName("ListarProjetos")
.WithTags("Projetos");

app.MapGet("/projetos/{id:guid}", async (
    Guid id,
    ObterProjetoHandler handler) =>
{
    var projeto = await handler.ExecutarAsync(id);
    return projeto is not null ? Results.Ok(projeto) : Results.NotFound();
})
.WithName("ObterProjeto")
.WithTags("Projetos");

app.MapPut("/projetos/{id:guid}", async (
    Guid id,
    AtualizarProjetoDto dto,
    IValidator<AtualizarProjetoDto> validator,
    AtualizarProjetoHandler handler) =>
{
    var validationResult = await validator.ValidateAsync(dto);
    if (!validationResult.IsValid)
    {
        return Results.BadRequest(validationResult.Errors);
    }

    var sucesso = await handler.ExecutarAsync(id, dto);
    return sucesso ? Results.Ok(new { Mensagem = "Projeto atualizado com sucesso" }) : Results.NotFound();
})
.WithName("AtualizarProjeto")
.WithTags("Projetos");

app.MapPatch("/projetos/{id:guid}/status", async (
    Guid id,
    AtualizarStatusDto dto,
    AtualizarStatusHandler handler) =>
{
    var sucesso = await handler.ExecutarAsync(id, dto);
    return sucesso ? Results.NoContent() : Results.NotFound();
})
.WithName("AtualizarStatusProjeto")
.WithTags("Projetos");

app.MapPost("/projetos/{id:guid}/documentos", async (
    Guid id,
    AdicionarDocumentoDto dto,
    AdicionarDocumentoHandler handler) =>
{
    var sucesso = await handler.ExecutarAsync(id, dto);
    return sucesso ? Results.Ok(new { Mensagem = "Documento adicionado com sucesso" }) : Results.NotFound();
})
.WithName("AdicionarDocumento")
.WithTags("Projetos");

// Endpoint para listar todas as rubricas
app.MapGet("/rubricas", async (IRubricaRepository rubricaRepository) =>
{
    var rubricas = await rubricaRepository.ObterTodosAsync();
    return Results.Ok(rubricas);
})
.WithName("ListarRubricas")
.WithTags("Rubricas");

app.Run();
