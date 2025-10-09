using Hackathon.IniciarProjeto.Application.DTOs;
using Hackathon.IniciarProjeto.Domain.Entities;
using Hackathon.IniciarProjeto.Domain.Enums;

namespace Hackathon.IniciarProjeto.Application.Test.Helpers;

public static class TestDataBuilder
{
    public static ImportarProjetoDto CriarImportarProjetoDtoValido()
    {
        return new ImportarProjetoDto
        {
            CodigoProjeto = "1/25",
            CentroCusto = "ASSESSORIA (6.11)",
            ReferenciaFundep = "FUNDEP 1/25",
            Titulo = "FUNDEP 1/25 - Projeto de Teste",
            Resumo = "FUNDEP 1/25 - Projeto de gestão interna para testes",
            Objeto = "Gestão administrativa e execução interna da fundação.",
            
            Executor = "SUP-SUPERINTENDENCIA (FUNDEP-FUND.DESEN)",
            CoExecutor = null,
            ReferenciaExecutor = "001",
            Coordenador = "JAIME ARTURO RAMIREZ [96007]",
            Financiador = "FUNDAÇÃO DE DESENVOLVIMENTO DA PESQUISA",
            CoFinanciador = null,
            OrigemRecurso = "FUNDAÇÃO DE DESENVOLVIMENTO DA PESQUISA",
            ReferenciaFinanciador = "0177",
            
            TipoOrcamento = TipoOrcamento.Oficial,
            CoordenadorAcessaInternet = true,
            Amf = 0.0m,
            Moeda = "REAL [R$]",
            Valor = 46928224.51m,
            Conta = "VINCULADA",
            CustoAdministrativo = "5%",
            CronogramaLiberacao = "Mensal",
            BloqueiosMovimentacoes = "Nenhum",
            TipoAplicacaoPermitida = TipoAplicacaoPermitida.AplicacaoLivre,
            SaldoAdiantamento = 0.0m,
            RazaoMultiplo = false,
            Banco = "BANCO DO BRASIL S/A [001]",
            Agencia = "SETOR PUBLICO BHZ [001*1.615-2]",
            ContaBancaria = "480.109-1",
            MoedaParaOrcar = "REAL [R$]",
            AbsorcaoTarifaFundep = true,
            MostrarOrcamentoMesmoSemLiberacao045 = true,
            
            DataImplantacao = DateTime.Today.AddDays(-30),
            ImplantacaoProvisoria = false,
            DataAssinatura = DateTime.Today.AddDays(-10),
            DataLimiteDespesas = null,
            InicioPrevisto = DateTime.Today.AddDays(1),
            TerminoPrevisto = DateTime.Today.AddDays(365),
            AguardandoProrrogacaoPara = null,
            
            Subprojetos = new List<SubprojetoDto>
            {
                CriarSubprojetoDtoValido()
            }
        };
    }

    public static SubprojetoDto CriarSubprojetoDtoValido()
    {
        return new SubprojetoDto
        {
            CodigoSubprojeto = "01",
            Nome = "Receitas",
            Objeto = "Receita do projeto de teste",
            Observacoes = "Observações de teste",
            Resumo = "Resumo do subprojeto",
            PropostaNumero = "PROP-001",
            InicioPrevisto = DateTime.Today.AddDays(1),
            TerminoPrevisto = DateTime.Today.AddDays(365),
            ValidadeGestaoDe = DateTime.Today,
            ValidadeGestaoAte = DateTime.Today.AddDays(400),
            LocacaoCebas = "Local CEBAS",
            SubprojetoSubstituto = null,
            Rubricas = new List<RubricaDto>
            {
                CriarRubricaDtoValida("101", "Serviços Técnicos Especializados"),
                CriarRubricaDtoValida("204", "Aquisição de Equipamentos", TipoRubrica.Material, OrigemRubrica.Importado)
            }
        };
    }

    public static RubricaDto CriarRubricaDtoValida(
        string codigo = "101", 
        string descricao = "Serviços Técnicos Especializados",
        TipoRubrica tipo = TipoRubrica.Servico,
        OrigemRubrica origem = OrigemRubrica.Nacional)
    {
        return new RubricaDto
        {
            Codigo = codigo,
            Descricao = descricao,
            Tipo = tipo,
            Origem = origem,
            Patrimoniavel = tipo == TipoRubrica.Material ? PatrimoniaveRubrica.Sim : PatrimoniaveRubrica.Nao,
            RepresentaTaxa = RepresentaTaxaRubrica.Direta,
            Servico = origem == OrigemRubrica.Nacional ? ServicoRubrica.CompraNacional : ServicoRubrica.CompraImportado,
            ReceitaFundep = tipo == TipoRubrica.Servico
        };
    }

    public static Projeto CriarProjetoValido(Guid? id = null)
    {
        var projetoId = id ?? Guid.NewGuid();
        
        var rubrica = new Rubrica
        {
            Id = Guid.NewGuid(),
            Codigo = "101",
            Descricao = "Serviços Técnicos Especializados",
            Tipo = TipoRubrica.Servico,
            Origem = OrigemRubrica.Nacional,
            Patrimoniavel = PatrimoniaveRubrica.Nao,
            RepresentaTaxa = RepresentaTaxaRubrica.Direta,
            Servico = ServicoRubrica.Pessoal,
            ReceitaFundep = true
        };

        var subprojeto = new Subprojeto
        {
            Id = Guid.NewGuid(),
            ProjetoId = projetoId,
            CodigoSubprojeto = "01",
            Nome = "Receitas",
            Objeto = "Receita",
            InicioPrevisto = DateTime.Today.AddDays(1),
            TerminoPrevisto = DateTime.Today.AddDays(365),
            ExecucaoEncerrada = false,
            Rubricas = new List<SubprojetoRubrica>
            {
                new SubprojetoRubrica
                {
                    SubprojetoId = Guid.NewGuid(),
                    RubricaId = rubrica.Id,
                    Rubrica = rubrica
                }
            }
        };

        return new Projeto
        {
            Id = projetoId,
            CodigoProjeto = "1/25",
            CentroCusto = "ASSESSORIA (6.11)",
            ReferenciaFundep = "FUNDEP 1/25",
            Titulo = "FUNDEP 1/25 - Projeto de Teste",
            Resumo = "FUNDEP 1/25 - Projeto de gestão interna",
            Objeto = "Gestão administrativa e execução interna da fundação.",
            
            Executor = "SUP-SUPERINTENDENCIA (FUNDEP-FUND.DESEN)",
            CoExecutor = null,
            ReferenciaExecutor = "001",
            Coordenador = "JAIME ARTURO RAMIREZ [96007]",
            Financiador = "FUNDAÇÃO DE DESENVOLVIMENTO DA PESQUISA",
            CoFinanciador = null,
            OrigemRecurso = "FUNDAÇÃO DE DESENVOLVIMENTO DA PESQUISA",
            ReferenciaFinanciador = "0177",
            
            TipoOrcamento = TipoOrcamento.Oficial,
            CoordenadorAcessaInternet = true,
            Amf = 0.0m,
            Moeda = "REAL [R$]",
            Valor = 46928224.51m,
            Conta = "VINCULADA",
            CustoAdministrativo = "5%",
            CronogramaLiberacao = "Mensal",
            BloqueiosMovimentacoes = "Nenhum",
            TipoAplicacaoPermitida = TipoAplicacaoPermitida.AplicacaoLivre,
            SaldoAdiantamento = 0.0m,
            RazaoMultiplo = false,
            Banco = "BANCO DO BRASIL S/A [001]",
            Agencia = "SETOR PUBLICO BHZ [001*1.615-2]",
            ContaBancaria = "480.109-1",
            MoedaParaOrcar = "REAL [R$]",
            AbsorcaoTarifaFundep = true,
            MostrarOrcamentoMesmoSemLiberacao045 = true,
            
            DataImplantacao = DateTime.Today.AddDays(-30),
            ImplantacaoProvisoria = false,
            DataAssinatura = DateTime.Today.AddDays(-10),
            DataLimiteDespesas = null,
            InicioPrevisto = DateTime.Today.AddDays(1),
            TerminoPrevisto = DateTime.Today.AddDays(365),
            AguardandoProrrogacaoPara = null,
            ExecucaoEncerrada = false,
            TerminoReal = null,
            
            Etapa = EtapaProjeto.Iniciacao,
            DataCriacao = DateTime.UtcNow.AddDays(-1),
            Subprojetos = new List<Subprojeto> { subprojeto }
        };
    }

    public static AtualizarStatusDto CriarAtualizarStatusDto(EtapaProjeto etapa = EtapaProjeto.Execucao)
    {
        return new AtualizarStatusDto { NovaEtapa = etapa };
    }

    public static AtualizarProjetoDto CriarAtualizarProjetoDto()
    {
        return new AtualizarProjetoDto
        {
            Titulo = "Projeto Atualizado - Teste",
            Resumo = "Resumo atualizado do projeto para testes unitários",
            Objeto = "Objeto atualizado do projeto com descrição detalhada para validação",
            Coordenador = "JOAO DA SILVA ATUALIZADO [12345]",
            CoExecutor = "MARIA SANTOS [67890]",
            CoFinanciador = "EMPRESA PARCEIRA ATUALIZADA LTDA",
            Valor = 250000.00m,
            CustoAdministrativo = "7%",
            CronogramaLiberacao = "Trimestral",
            BloqueiosMovimentacoes = "Nenhum bloqueio atualizado",
            DataLimiteDespesas = DateTime.Today.AddDays(350),
            InicioPrevisto = DateTime.Today.AddDays(5),
            TerminoPrevisto = DateTime.Today.AddDays(400),
            AguardandoProrrogacaoPara = DateTime.Today.AddDays(450)
        };
    }

    public static AdicionarDocumentoDto CriarAdicionarDocumentoDto(
        string nomeDocumento = "documento-teste.pdf",
        string conteudoBase64 = "base64-content-test")
    {
        return new AdicionarDocumentoDto
        {
            NomeDocumento = nomeDocumento,
            ConteudoBase64 = conteudoBase64
        };
    }
}