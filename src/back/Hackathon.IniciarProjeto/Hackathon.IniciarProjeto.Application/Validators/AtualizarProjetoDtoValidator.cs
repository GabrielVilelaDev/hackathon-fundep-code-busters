using FluentValidation;
using Hackathon.IniciarProjeto.Application.DTOs;

namespace Hackathon.IniciarProjeto.Application.Validators;

public class AtualizarProjetoDtoValidator : AbstractValidator<AtualizarProjetoDto>
{
    public AtualizarProjetoDtoValidator()
    {
        RuleFor(x => x.Titulo)
            .NotEmpty().WithMessage("Título do projeto é obrigatório")
            .MaximumLength(500).WithMessage("Título deve ter no máximo 500 caracteres");

        RuleFor(x => x.Resumo)
            .NotEmpty().WithMessage("Resumo do projeto é obrigatório")
            .MaximumLength(1000).WithMessage("Resumo deve ter no máximo 1000 caracteres");

        RuleFor(x => x.Objeto)
            .NotEmpty().WithMessage("Objeto do projeto é obrigatório")
            .MaximumLength(2000).WithMessage("Objeto deve ter no máximo 2000 caracteres");

        RuleFor(x => x.Coordenador)
            .NotEmpty().WithMessage("Coordenador é obrigatório")
            .MaximumLength(200).WithMessage("Nome do coordenador deve ter no máximo 200 caracteres");

        RuleFor(x => x.CoExecutor)
            .MaximumLength(200).WithMessage("Nome do co-executor deve ter no máximo 200 caracteres")
            .When(x => !string.IsNullOrEmpty(x.CoExecutor));

        RuleFor(x => x.CoFinanciador)
            .MaximumLength(200).WithMessage("Nome do co-financiador deve ter no máximo 200 caracteres")
            .When(x => !string.IsNullOrEmpty(x.CoFinanciador));

        RuleFor(x => x.Valor)
            .GreaterThan(0).WithMessage("Valor deve ser maior que zero");

        RuleFor(x => x.CustoAdministrativo)
            .NotEmpty().WithMessage("Custo administrativo é obrigatório")
            .MaximumLength(20).WithMessage("Custo administrativo deve ter no máximo 20 caracteres");

        RuleFor(x => x.CronogramaLiberacao)
            .NotEmpty().WithMessage("Cronograma de liberação é obrigatório")
            .MaximumLength(50).WithMessage("Cronograma de liberação deve ter no máximo 50 caracteres");

        RuleFor(x => x.BloqueiosMovimentacoes)
            .NotEmpty().WithMessage("Bloqueios de movimentações é obrigatório")
            .MaximumLength(100).WithMessage("Bloqueios de movimentações deve ter no máximo 100 caracteres");

        RuleFor(x => x.InicioPrevisto)
            .NotEmpty().WithMessage("Data de início prevista é obrigatória");

        RuleFor(x => x.TerminoPrevisto)
            .NotEmpty().WithMessage("Data de término prevista é obrigatória")
            .GreaterThan(x => x.InicioPrevisto).WithMessage("Data de término deve ser posterior ao início");

        RuleFor(x => x.AguardandoProrrogacaoPara)
            .GreaterThan(x => x.TerminoPrevisto)
            .WithMessage("Data de prorrogação deve ser posterior ao término previsto")
            .When(x => x.AguardandoProrrogacaoPara.HasValue);

        RuleFor(x => x.DataLimiteDespesas)
            .GreaterThanOrEqualTo(x => x.InicioPrevisto)
            .WithMessage("Data limite de despesas deve ser igual ou posterior ao início")
            .When(x => x.DataLimiteDespesas.HasValue);
    }
}