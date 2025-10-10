using Hackathon.IniciarProjeto.Domain.Entities;
using Hackathon.IniciarProjeto.Domain.Enums;
using Hackathon.IniciarProjeto.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Hackathon.IniciarProjeto.Infrastructure.Services;

public class ProjetoSeedService
{
    private readonly IProjetoRepository _projetoRepository;
    private readonly ILogger<ProjetoSeedService> _logger;

    public ProjetoSeedService(IProjetoRepository projetoRepository, ILogger<ProjetoSeedService> logger)
    {
        _projetoRepository = projetoRepository;
        _logger = logger;
    }

    public async Task SeedAsync()
    {
        _logger.LogInformation("Iniciando o seed de projetos...");

        var projetos = await _projetoRepository.ObterTodosAsync();
        if (projetos.Any())
        {
            _logger.LogInformation("Projetos já existem no repositório. Seed não será executado.");
            return;
        }

        var projetosSeed = CriarProjetosSeed();

        foreach (var projeto in projetosSeed)
        {
            await _projetoRepository.AdicionarAsync(projeto);
            _logger.LogInformation("Projeto seed adicionado: {Titulo} (ID: {Id})", projeto.Titulo, projeto.Id);
        }

        _logger.LogInformation("Seed de projetos concluído. Total de projetos adicionados: {Count}", projetosSeed.Count);
    }

    private List<Projeto> CriarProjetosSeed()
    {
        var dataAtual = DateTime.Now;
        var projetos = new List<Projeto>();

        // Projeto 1: Sistema de Gestão Acadêmica
        var projeto1 = new Projeto
        {
            Id = Guid.NewGuid(),
            CodigoProjeto = "PROJ-001",
            CentroCusto = "CC-001",
            ReferenciaFundep = "FUNDEP-2025-001",
            Titulo = "Sistema de Gestão Acadêmica Integrado",
            Resumo = "Desenvolvimento de um sistema completo para gestão acadêmica com módulos de matrícula, notas, frequência e relatórios.",
            Objeto = "Sistema web para gestão acadêmica completa",
            Executor = "Universidade Federal de Minas Gerais",
            CoExecutor = "Instituto de Tecnologia UFMG",
            ReferenciaExecutor = "UFMG-TI-001",
            Coordenador = "Prof. Dr. João Silva",
            Financiador = "FAPEMIG",
            CoFinanciador = "CNPq",
            OrigemRecurso = "Recursos Públicos Estaduais e Federais",
            ReferenciaFinanciador = "FAPEMIG-2025-001",
            TipoOrcamento = TipoOrcamento.Oficial,
            CoordenadorAcessaInternet = true,
            Amf = 15000.00m,
            Moeda = "BRL",
            Valor = 850000.00m,
            Conta = "001.001.001",
            CustoAdministrativo = "12% sobre o valor total",
            CronogramaLiberacao = "Liberação em 4 parcelas trimestrais",
            BloqueiosMovimentacoes = "Sem bloqueios previstos",
            TipoAplicacaoPermitida = TipoAplicacaoPermitida.AplicacaoLivre,
            SaldoAdiantamento = 0.00m,
            RazaoMultiplo = false,
            Banco = "Banco do Brasil",
            Agencia = "1234-5",
            ContaBancaria = "12345678-9",
            MoedaParaOrcar = "BRL",
            AbsorcaoTarifaFundep = true,
            MostrarOrcamentoMesmoSemLiberacao045 = false,
            DataImplantacao = dataAtual.AddDays(-30),
            ImplantacaoProvisoria = false,
            DataAssinatura = dataAtual.AddDays(-45),
            DataLimiteDespesas = dataAtual.AddMonths(18),
            InicioPrevisto = dataAtual.AddDays(-30),
            TerminoPrevisto = dataAtual.AddMonths(18),
            AguardandoProrrogacaoPara = null,
            ExecucaoEncerrada = false,
            TerminoReal = null,
            Etapa = EtapaProjeto.Execucao,
            DataCriacao = dataAtual.AddDays(-50),
            Subprojetos = new List<Subprojeto>
            {
                new Subprojeto
                {
                    Id = Guid.NewGuid(),
                    CodigoSubprojeto = "SUB-001-01",
                    Nome = "Módulo de Matrícula",
                    Objeto = "Desenvolvimento do módulo de matrícula online",
                    Observacoes = "Prioridade alta - deve ser entregue primeiro",
                    Resumo = "Sistema de matrícula online com validações automáticas",
                    PropostaNumero = "PROP-001-01",
                    InicioPrevisto = dataAtual.AddDays(-30),
                    TerminoPrevisto = dataAtual.AddMonths(6),
                    TerminoReal = null,
                    ExecucaoEncerrada = false,
                    ValidadeGestaoDe = dataAtual.AddDays(-30),
                    ValidadeGestaoAte = dataAtual.AddMonths(6),
                    LocacaoCebas = null,
                    SubprojetoSubstituto = null,
                    Rubricas = new List<SubprojetoRubrica>()
                },
                new Subprojeto
                {
                    Id = Guid.NewGuid(),
                    CodigoSubprojeto = "SUB-001-02",
                    Nome = "Módulo de Notas e Frequência",
                    Objeto = "Desenvolvimento do módulo de controle de notas e frequência",
                    Observacoes = "Integração com sistema de matrícula obrigatória",
                    Resumo = "Controle acadêmico de notas e frequência dos estudantes",
                    PropostaNumero = "PROP-001-02",
                    InicioPrevisto = dataAtual.AddMonths(3),
                    TerminoPrevisto = dataAtual.AddMonths(12),
                    TerminoReal = null,
                    ExecucaoEncerrada = false,
                    ValidadeGestaoDe = dataAtual.AddMonths(3),
                    ValidadeGestaoAte = dataAtual.AddMonths(12),
                    LocacaoCebas = null,
                    SubprojetoSubstituto = null,
                    Rubricas = new List<SubprojetoRubrica>()
                }
            },
            Documentos = new List<Documento>()
        };

        // Projeto 2: Plataforma de Educação à Distância
        var projeto2 = new Projeto
        {
            Id = Guid.NewGuid(),
            CodigoProjeto = "PROJ-002",
            CentroCusto = "CC-002",
            ReferenciaFundep = "FUNDEP-2025-002",
            Titulo = "Plataforma de Educação à Distância - EAD FUNDEP",
            Resumo = "Criação de uma plataforma moderna para educação à distância com recursos avançados de interatividade e gamificação.",
            Objeto = "Plataforma web e mobile para educação à distância",
            Executor = "Instituto de Educação Digital",
            CoExecutor = null,
            ReferenciaExecutor = "IED-2025-001",
            Coordenador = "Profa. Dra. Maria Santos",
            Financiador = "Ministério da Educação",
            CoFinanciador = null,
            OrigemRecurso = "Recursos Federais - MEC",
            ReferenciaFinanciador = "MEC-EAD-2025-002",
            TipoOrcamento = TipoOrcamento.Oficial,
            CoordenadorAcessaInternet = true,
            Amf = 25000.00m,
            Moeda = "BRL",
            Valor = 1200000.00m,
            Conta = "002.002.002",
            CustoAdministrativo = "15% sobre o valor total",
            CronogramaLiberacao = "Liberação em 6 parcelas bimestrais",
            BloqueiosMovimentacoes = "Sem bloqueios previstos",
            TipoAplicacaoPermitida = TipoAplicacaoPermitida.AplicacaoLivre,
            SaldoAdiantamento = 120000.00m,
            RazaoMultiplo = true,
            Banco = "Caixa Econômica Federal",
            Agencia = "5678-9",
            ContaBancaria = "87654321-0",
            MoedaParaOrcar = "BRL",
            AbsorcaoTarifaFundep = true,
            MostrarOrcamentoMesmoSemLiberacao045 = true,
            DataImplantacao = dataAtual.AddDays(-15),
            ImplantacaoProvisoria = false,
            DataAssinatura = dataAtual.AddDays(-20),
            DataLimiteDespesas = dataAtual.AddMonths(24),
            InicioPrevisto = dataAtual.AddDays(-15),
            TerminoPrevisto = dataAtual.AddMonths(24),
            AguardandoProrrogacaoPara = null,
            ExecucaoEncerrada = false,
            TerminoReal = null,
            Etapa = EtapaProjeto.Execucao,
            DataCriacao = dataAtual.AddDays(-25),
            Subprojetos = new List<Subprojeto>
            {
                new Subprojeto
                {
                    Id = Guid.NewGuid(),
                    CodigoSubprojeto = "SUB-002-01",
                    Nome = "Plataforma Web",
                    Objeto = "Desenvolvimento da plataforma web responsiva",
                    Observacoes = "Deve suportar até 10.000 usuários simultâneos",
                    Resumo = "Interface web moderna e responsiva para educação à distância",
                    PropostaNumero = "PROP-002-01",
                    InicioPrevisto = dataAtual.AddDays(-15),
                    TerminoPrevisto = dataAtual.AddMonths(12),
                    TerminoReal = null,
                    ExecucaoEncerrada = false,
                    ValidadeGestaoDe = dataAtual.AddDays(-15),
                    ValidadeGestaoAte = dataAtual.AddMonths(12),
                    LocacaoCebas = null,
                    SubprojetoSubstituto = null,
                    Rubricas = new List<SubprojetoRubrica>()
                }
            },
            Documentos = new List<Documento>()
        };

        // Projeto 3: Pesquisa em Inteligência Artificial
        var projeto3 = new Projeto
        {
            Id = Guid.NewGuid(),
            CodigoProjeto = "PROJ-003",
            CentroCusto = "CC-003",
            ReferenciaFundep = "FUNDEP-2025-003",
            Titulo = "Aplicação de IA em Diagnóstico Médico",
            Resumo = "Pesquisa e desenvolvimento de algoritmos de inteligência artificial para auxílio em diagnóstico médico por imagem.",
            Objeto = "Sistema de IA para diagnóstico médico",
            Executor = "Hospital das Clínicas UFMG",
            CoExecutor = "Departamento de Ciência da Computação",
            ReferenciaExecutor = "HC-UFMG-001",
            Coordenador = "Dr. Carlos Oliveira",
            Financiador = "CNPq",
            CoFinanciador = "FAPESP",
            OrigemRecurso = "Recursos Federais e Estaduais",
            ReferenciaFinanciador = "CNPq-IA-2025-003",
            TipoOrcamento = TipoOrcamento.Provisorio,
            CoordenadorAcessaInternet = true,
            Amf = 8000.00m,
            Moeda = "BRL",
            Valor = 450000.00m,
            Conta = "003.003.003",
            CustoAdministrativo = "10% sobre o valor total",
            CronogramaLiberacao = "Liberação em 3 parcelas quadrimestrais",
            BloqueiosMovimentacoes = "Aguardando aprovação do comitê de ética",
            TipoAplicacaoPermitida = TipoAplicacaoPermitida.AplicacaoRestrita,
            SaldoAdiantamento = 0.00m,
            RazaoMultiplo = false,
            Banco = "Banco do Brasil",
            Agencia = "9999-8",
            ContaBancaria = "99988877-6",
            MoedaParaOrcar = "BRL",
            AbsorcaoTarifaFundep = false,
            MostrarOrcamentoMesmoSemLiberacao045 = false,
            DataImplantacao = dataAtual.AddDays(15),
            ImplantacaoProvisoria = true,
            DataAssinatura = dataAtual.AddDays(-5),
            DataLimiteDespesas = dataAtual.AddMonths(36),
            InicioPrevisto = dataAtual.AddDays(15),
            TerminoPrevisto = dataAtual.AddMonths(36),
            AguardandoProrrogacaoPara = null,
            ExecucaoEncerrada = false,
            TerminoReal = null,
            Etapa = EtapaProjeto.Iniciacao,
            DataCriacao = dataAtual.AddDays(-10),
            Subprojetos = new List<Subprojeto>(),
            Documentos = new List<Documento>()
        };

        // Projeto 4: Sistema de Monitoramento Ambiental (Finalizado)
        var projeto4 = new Projeto
        {
            Id = Guid.NewGuid(),
            CodigoProjeto = "PROJ-004",
            CentroCusto = "CC-004",
            ReferenciaFundep = "FUNDEP-2024-004",
            Titulo = "Sistema de Monitoramento Ambiental IoT",
            Resumo = "Desenvolvimento de sistema IoT para monitoramento da qualidade do ar e água em tempo real.",
            Objeto = "Rede de sensores IoT para monitoramento ambiental",
            Executor = "Instituto de Geociências UFMG",
            CoExecutor = "Escola de Engenharia",
            ReferenciaExecutor = "IGC-UFMG-004",
            Coordenador = "Prof. Dr. Ana Costa",
            Financiador = "IBAMA",
            CoFinanciador = null,
            OrigemRecurso = "Recursos Federais - IBAMA",
            ReferenciaFinanciador = "IBAMA-MON-2024-004",
            TipoOrcamento = TipoOrcamento.Oficial,
            CoordenadorAcessaInternet = true,
            Amf = 12000.00m,
            Moeda = "BRL",
            Valor = 680000.00m,
            Conta = "004.004.004",
            CustoAdministrativo = "8% sobre o valor total",
            CronogramaLiberacao = "Projeto finalizado - todas as parcelas liberadas",
            BloqueiosMovimentacoes = "Sem bloqueios - projeto encerrado",
            TipoAplicacaoPermitida = TipoAplicacaoPermitida.AplicacaoLivre,
            SaldoAdiantamento = 0.00m,
            RazaoMultiplo = false,
            Banco = "Banco do Brasil",
            Agencia = "1111-2",
            ContaBancaria = "11223344-5",
            MoedaParaOrcar = "BRL",
            AbsorcaoTarifaFundep = true,
            MostrarOrcamentoMesmoSemLiberacao045 = false,
            DataImplantacao = dataAtual.AddDays(-400),
            ImplantacaoProvisoria = false,
            DataAssinatura = dataAtual.AddDays(-420),
            DataLimiteDespesas = dataAtual.AddDays(-30),
            InicioPrevisto = dataAtual.AddDays(-400),
            TerminoPrevisto = dataAtual.AddDays(-30),
            AguardandoProrrogacaoPara = null,
            ExecucaoEncerrada = true,
            TerminoReal = dataAtual.AddDays(-25),
            Etapa = EtapaProjeto.PrestacaoDeContas,
            DataCriacao = dataAtual.AddDays(-450),
            Subprojetos = new List<Subprojeto>(),
            Documentos = new List<Documento>()
        };

        projetos.AddRange(new[] { projeto1, projeto2, projeto3, projeto4 });

        // Configurar referências dos subprojetos
        foreach (var projeto in projetos)
        {
            foreach (var subprojeto in projeto.Subprojetos)
            {
                subprojeto.ProjetoId = projeto.Id;
                subprojeto.Projeto = projeto;
            }
        }

        return projetos;
    }
}