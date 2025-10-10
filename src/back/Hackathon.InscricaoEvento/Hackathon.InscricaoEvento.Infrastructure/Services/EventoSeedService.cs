using Hackathon.InscricaoEvento.Domain.Entities;
using Hackathon.InscricaoEvento.Domain.Enums;
using Hackathon.InscricaoEvento.Domain.Interfaces;

namespace Hackathon.InscricaoEvento.Infrastructure.Services;

public class EventoSeedService
{
    private readonly IEventoRepository _eventoRepository;
    private readonly IMatriculaRepository _matriculaRepository;

    public EventoSeedService(IEventoRepository eventoRepository, IMatriculaRepository matriculaRepository)
    {
        _eventoRepository = eventoRepository;
        _matriculaRepository = matriculaRepository;
    }

    public async Task SeedAsync()
    {
        var eventos = await _eventoRepository.ObterTodosAsync();

        // Se já existem eventos, não criar novamente
        if (eventos.Any())
            return;

        await CriarEventosIniciais();
    }

    private async Task CriarEventosIniciais()
    {
        var dataBase = DateTime.Now;

        // Evento 1: Workshop de .NET 8
        var evento1 = new Evento
        {
            Id = Guid.NewGuid(),
            Titulo = "Workshop Avançado de .NET 8 e Minimal APIs",
            Descricao = "Workshop prático focado nas novas funcionalidades do .NET 8, incluindo Minimal APIs, performance improvements e cloud-native patterns. Inclui laboratórios hands-on e projetos práticos.",
            Local = "Auditório Central - FUNDEP",
            Ministrantes = "Gabriel Vilela, Maria Santos, João Silva",
            DataInicioMatricula = dataBase.AddDays(-30),
            DataFimMatricula = dataBase.AddDays(5),
            DataInicioEvento = dataBase.AddDays(10),
            DataFimEvento = dataBase.AddDays(12),
            NumeroMaximoInscritos = 50,
            Valor = 350.00m,
            DataCriacao = dataBase.AddDays(-35)
        };

        // Evento 2: Hackathon de Inovação
        var evento2 = new Evento
        {
            Id = Guid.NewGuid(),
            Titulo = "Hackathon FUNDEP - Inovação em HealthTech",
            Descricao = "Competição de 48 horas para desenvolvimento de soluções inovadoras na área de saúde digital. Equipes multidisciplinares trabalhando em desafios reais do setor de saúde.",
            Local = "Centro de Inovação FUNDEP",
            Ministrantes = "Dr. Ana Beatriz, Prof. Carlos Eduardo, Eng. Fernanda Lima",
            DataInicioMatricula = dataBase.AddDays(-25),
            DataFimMatricula = dataBase.AddDays(2),
            DataInicioEvento = dataBase.AddDays(7),
            DataFimEvento = dataBase.AddDays(9),
            NumeroMaximoInscritos = 80,
            Valor = 0.00m, // Evento gratuito
            DataCriacao = dataBase.AddDays(-30)
        };

        // Evento 3: Curso de Clean Architecture
        var evento3 = new Evento
        {
            Id = Guid.NewGuid(),
            Titulo = "Clean Architecture e DDD na Prática",
            Descricao = "Curso intensivo sobre Clean Architecture, Domain-Driven Design e boas práticas de desenvolvimento. Aborda padrões como CQRS, Event Sourcing e microserviços.",
            Local = "Sala de Treinamento B - FUNDEP",
            Ministrantes = "Arq. Software Roberto Mendes, Tech Lead Sandra Costa",
            DataInicioMatricula = dataBase.AddDays(-20),
            DataFimMatricula = dataBase.AddDays(8),
            DataInicioEvento = dataBase.AddDays(15),
            DataFimEvento = dataBase.AddDays(17),
            NumeroMaximoInscritos = 30,
            Valor = 480.00m,
            DataCriacao = dataBase.AddDays(-25)
        };

        // Evento 4: Seminário de DevOps e Cloud
        var evento4 = new Evento
        {
            Id = Guid.NewGuid(),
            Titulo = "Seminário DevOps e Cloud Computing",
            Descricao = "Evento focado em práticas DevOps, containerização, orquestração e deploy em cloud. Inclui demonstrações práticas com Azure, Docker e Kubernetes.",
            Local = "Auditório Virtual + Presencial",
            Ministrantes = "DevOps Engineer Lucas Ferreira, Cloud Architect Patricia Oliveira",
            DataInicioMatricula = dataBase.AddDays(-15),
            DataFimMatricula = dataBase.AddDays(12),
            DataInicioEvento = dataBase.AddDays(20),
            DataFimEvento = dataBase.AddDays(20),
            NumeroMaximoInscritos = 100,
            Valor = 120.00m,
            DataCriacao = dataBase.AddDays(-20)
        };

        // Adicionar eventos aos repositórios
        await _eventoRepository.AdicionarAsync(evento1);
        await _eventoRepository.AdicionarAsync(evento2);
        await _eventoRepository.AdicionarAsync(evento3);
        await _eventoRepository.AdicionarAsync(evento4);

        // Criar matrículas para o aluno ID: 1
        await CriarMatriculasParaAluno("1", evento1, evento2, evento3, dataBase);
    }

    private async Task CriarMatriculasParaAluno(string codigoAluno, Evento evento1, Evento evento2, Evento evento3, DateTime dataBase)
    {
        // Matrícula 1: Workshop .NET 8 - Confirmada
        var matricula1 = new Matricula
        {
            Id = Guid.NewGuid(),
            CodigoAluno = codigoAluno,
            EventoId = evento1.Id,
            Status = StatusMatricula.Confirmada,
            TipoPagamento = TipoPagamento.Boleto,
            DataMatricula = dataBase.AddDays(-28)
        };

        // Matrícula 2: Hackathon - Confirmada (evento gratuito)
        var matricula2 = new Matricula
        {
            Id = Guid.NewGuid(),
            CodigoAluno = codigoAluno,
            EventoId = evento2.Id,
            Status = StatusMatricula.Confirmada,
            TipoPagamento = TipoPagamento.Boleto, // Mesmo sendo gratuito, mantém o tipo de pagamento
            DataMatricula = dataBase.AddDays(-22)
        };

        // Matrícula 3: Clean Architecture - Pendente
        var matricula3 = new Matricula
        {
            Id = Guid.NewGuid(),
            CodigoAluno = codigoAluno,
            EventoId = evento3.Id,
            Status = StatusMatricula.Pendente,
            TipoPagamento = TipoPagamento.Boleto,
            DataMatricula = dataBase.AddDays(-5)
        };

        // Adicionar matrículas ao repositório
        await _matriculaRepository.AdicionarAsync(matricula1);
        await _matriculaRepository.AdicionarAsync(matricula2);
        await _matriculaRepository.AdicionarAsync(matricula3);
    }
}