using FluentValidation;
using Hackathon.IniciarProjeto.Application.DTOs;

namespace Hackathon.IniciarProjeto.Application.Validators;

public class ImportarProjetoDtoValidator : AbstractValidator<ImportarProjetoDto>
{
    public ImportarProjetoDtoValidator()
    {
        RuleFor(x => x.CodigoProjeto)
            .NotEmpty().WithMessage("Código do projeto é obrigatório")
            .MaximumLength(50).WithMessage("Código deve ter no máximo 50 caracteres");

        RuleFor(x => x.Titulo)
            .NotEmpty().WithMessage("Título do projeto é obrigatório")
            .MaximumLength(500).WithMessage("Título deve ter no máximo 500 caracteres");

        RuleFor(x => x.Coordenador)
            .NotEmpty().WithMessage("Coordenador é obrigatório")
            .MaximumLength(200).WithMessage("Nome do coordenador deve ter no máximo 200 caracteres");

        RuleFor(x => x.Executor)
            .NotEmpty().WithMessage("Executor é obrigatório")
            .MaximumLength(200).WithMessage("Executor deve ter no máximo 200 caracteres");

        RuleFor(x => x.Financiador)
            .NotEmpty().WithMessage("Financiador é obrigatório")
            .MaximumLength(200).WithMessage("Financiador deve ter no máximo 200 caracteres");

        RuleFor(x => x.Valor)
            .GreaterThan(0).WithMessage("Valor deve ser maior que zero");

        RuleFor(x => x.InicioPrevisto)
            .NotEmpty().WithMessage("Data de início prevista é obrigatória");

        RuleFor(x => x.TerminoPrevisto)
            .NotEmpty().WithMessage("Data de término prevista é obrigatória")
            .GreaterThan(x => x.InicioPrevisto).WithMessage("Data de término deve ser posterior ao início");

        RuleFor(x => x.Subprojetos)
            .NotEmpty().WithMessage("Projeto deve ter pelo menos um subprojeto");

        RuleForEach(x => x.Subprojetos).SetValidator(new SubprojetoDtoValidator());
    }
}

public class SubprojetoDtoValidator : AbstractValidator<SubprojetoDto>
{
    public SubprojetoDtoValidator()
    {
        RuleFor(x => x.CodigoSubprojeto)
            .NotEmpty().WithMessage("Código do subprojeto é obrigatório")
            .MaximumLength(20).WithMessage("Código deve ter no máximo 20 caracteres");

        RuleFor(x => x.Nome)
            .NotEmpty().WithMessage("Nome do subprojeto é obrigatório")
            .MaximumLength(200).WithMessage("Nome deve ter no máximo 200 caracteres");

        RuleFor(x => x.Objeto)
            .NotEmpty().WithMessage("Objeto do subprojeto é obrigatório")
            .MaximumLength(1000).WithMessage("Objeto deve ter no máximo 1000 caracteres");

        RuleFor(x => x.InicioPrevisto)
            .NotEmpty().WithMessage("Data de início prevista é obrigatória");

        RuleFor(x => x.TerminoPrevisto)
            .NotEmpty().WithMessage("Data de término prevista é obrigatória")
            .GreaterThan(x => x.InicioPrevisto).WithMessage("Data de término deve ser posterior ao início");

        RuleForEach(x => x.Rubricas).SetValidator(new RubricaDtoValidator());
    }
}

public class RubricaDtoValidator : AbstractValidator<RubricaDto>
{
    public RubricaDtoValidator()
    {
        RuleFor(x => x.Codigo)
            .NotEmpty().WithMessage("Código da rubrica é obrigatório")
            .MaximumLength(20).WithMessage("Código deve ter no máximo 20 caracteres");

        RuleFor(x => x.Descricao)
            .NotEmpty().WithMessage("Descrição da rubrica é obrigatória")
            .MaximumLength(500).WithMessage("Descrição deve ter no máximo 500 caracteres");

        RuleFor(x => x.Tipo)
            .IsInEnum().WithMessage("Tipo da rubrica deve ser válido");

        RuleFor(x => x.Origem)
            .IsInEnum().WithMessage("Origem da rubrica deve ser válida");
    }
}