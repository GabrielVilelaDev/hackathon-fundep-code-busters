using Hackathon.AnalisarEAprovarProposta.Application.DTOs;
using Hackathon.AnalisarEAprovarProposta.Domain.Entities;
using Hackathon.AnalisarEAprovarProposta.Domain.Enums;
using Hackathon.AnalisarEAprovarProposta.Domain.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Hackathon.AnalisarEAprovarProposta.Application.Test.Services
{
    public class PropostaServiceTests
    {
        private readonly Mock<IPropostaRepository> _mockRepo;
        private readonly PropostaService _service;

        public PropostaServiceTests()
        {
            _mockRepo = new Mock<IPropostaRepository>();
            _service = new PropostaService(_mockRepo.Object);
        }

        [Fact]
        public async Task ListarPropostasAsync_RetornaTodas()
        {
            // Arrange
            var propostas = new List<Proposta>
        {
            new Proposta { Id = 1, Titulo = "Proposta A", Status = StatusProposta.EmAnalise },
            new Proposta { Id = 2, Titulo = "Proposta B", Status = StatusProposta.Aprovada }
        };
            _mockRepo.Setup(r => r.ListarTodasAsync(null)).ReturnsAsync(propostas);

            // Act
            var result = await _service.ListarPropostasAsync();

            // Assert
            Assert.Equal(2, result.Count);
            Assert.Contains(result, p => p.Titulo == "Proposta A");
            Assert.Contains(result, p => p.Titulo == "Proposta B");
        }

        [Fact]
        public async Task ObterPorIdAsync_QuandoExiste_RetornaProposta()
        {
            // Arrange
            var proposta = new Proposta { Id = 1, Titulo = "Proposta A", Status = StatusProposta.EmAnalise };
            _mockRepo.Setup(r => r.ObterPorIdAsync(1)).ReturnsAsync(proposta);

            // Act
            var result = await _service.ObterPorIdAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Proposta A", result!.Titulo);
        }

        [Fact]
        public async Task AnalisarAsync_Aprovar_AlteraStatusParaAprovada()
        {
            // Arrange
            var proposta = new Proposta { Id = 1, Titulo = "Proposta A", Status = StatusProposta.EmAnalise };
            _mockRepo.Setup(r => r.ObterPorIdAsync(1)).ReturnsAsync(proposta);
            _mockRepo.Setup(r => r.AtualizarAsync(proposta)).Returns(Task.CompletedTask);

            var request = new AnalisarPropostaRequest
            {
                Acao = "Aprovar",
                Responsavel = "Analista",
                Justificativa = "Ok"
            };

            // Act
            var result = await _service.AnalisarAsync(1, request);

            // Assert
            Assert.Equal(StatusProposta.Aprovada, result.Status);
            _mockRepo.Verify(r => r.AtualizarAsync(It.IsAny<Proposta>()), Times.Once);
        }
    }
}
