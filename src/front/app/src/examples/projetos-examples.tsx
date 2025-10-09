/**
 * Exemplos de uso dos hooks de projetos
 */

import React from 'react'
import {
  useObterProjeto,
  useImportarProjeto,
  useAtualizarProjeto,
  useAtualizarStatusProjeto,
  useAdicionarDocumento,
  useListarRubricas,
  useProjetoOperations,
} from '@/hooks/useProjetos'
import { EtapaProjeto } from '@/types/projetos.types'

// ============================================
// Exemplo 1: Listar Rubricas
// ============================================

export const ListaRubricasExample = () => {
  const { data: rubricas, isLoading, error } = useListarRubricas()

  if (isLoading) return <div>Carregando rubricas...</div>
  if (error) return <div>Erro ao carregar rubricas: {error.message}</div>

  return (
    <div>
      <h2>Rubricas</h2>
      <ul>
        {rubricas?.map((rubrica) => (
          <li key={rubrica.id}>
            {rubrica.codigo} - {rubrica.descricao}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================
// Exemplo 2: Detalhes do Projeto
// ============================================

export const ProjetoDetalhesExample = ({ projetoId }: { projetoId: string }) => {
  const { data: projeto, isLoading, error } = useObterProjeto(projetoId)

  if (isLoading) return <div>Carregando projeto...</div>
  if (error) return <div>Erro ao carregar projeto: {error.message}</div>
  if (!projeto) return <div>Projeto não encontrado</div>

  return (
    <div>
      <h1>{projeto.titulo}</h1>
      <p>Código: {projeto.codigoProjeto}</p>
      <p>Coordenador: {projeto.coordenador}</p>
      <p>Valor: R$ {projeto.valor?.toLocaleString('pt-BR')}</p>
      <p>
        Período: {new Date(projeto.inicioPrevisto).toLocaleDateString()} até{' '}
        {new Date(projeto.terminoPrevisto).toLocaleDateString()}
      </p>
      <p>Resumo: {projeto.resumo}</p>
      
      {projeto.subprojetos && projeto.subprojetos.length > 0 && (
        <div>
          <h3>Subprojetos</h3>
          <ul>
            {projeto.subprojetos.map((sub, idx) => (
              <li key={idx}>
                {sub.codigoSubprojeto} - {sub.nome}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ============================================
// Exemplo 3: Importar Projeto
// ============================================

export const ImportarProjetoExample = () => {
  const { mutate: importarProjeto, isPending, error } = useImportarProjeto()

  const handleImportar = () => {
    importarProjeto(
      {
        codigoProjeto: 'PROJ-2024-001',
        titulo: 'Novo Projeto de Pesquisa',
        resumo: 'Resumo do projeto',
        coordenador: 'Dr. João Silva',
        valor: 150000.0,
        inicioPrevisto: new Date().toISOString(),
        terminoPrevisto: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        dataImplantacao: new Date().toISOString(),
        dataAssinatura: new Date().toISOString(),
      },
      {
        onSuccess: (data) => {
          console.log('Projeto importado com sucesso:', data)
          alert(`Projeto ${data.id} importado com sucesso!`)
        },
        onError: (error) => {
          console.error('Erro ao importar projeto:', error)
          alert('Erro ao importar projeto')
        },
      }
    )
  }

  return (
    <div>
      <h2>Importar Projeto</h2>
      <button onClick={handleImportar} disabled={isPending}>
        {isPending ? 'Importando...' : 'Importar Projeto'}
      </button>
      {error && <div style={{ color: 'red' }}>Erro: {error.message}</div>}
    </div>
  )
}

// ============================================
// Exemplo 4: Atualizar Projeto
// ============================================

export const AtualizarProjetoExample = ({ projetoId }: { projetoId: string }) => {
  const { mutate: atualizarProjeto, isPending } = useAtualizarProjeto()

  const handleAtualizar = () => {
    atualizarProjeto(
      {
        id: projetoId,
        data: {
          titulo: 'Título Atualizado',
          resumo: 'Resumo atualizado do projeto',
          valor: 200000.0,
          inicioPrevisto: new Date().toISOString(),
          terminoPrevisto: new Date(Date.now() + 400 * 24 * 60 * 60 * 1000).toISOString(),
        },
      },
      {
        onSuccess: () => {
          alert('Projeto atualizado com sucesso!')
        },
        onError: (error) => {
          alert(`Erro ao atualizar: ${error.message}`)
        },
      }
    )
  }

  return (
    <button onClick={handleAtualizar} disabled={isPending}>
      {isPending ? 'Atualizando...' : 'Atualizar Projeto'}
    </button>
  )
}

// ============================================
// Exemplo 5: Atualizar Status
// ============================================

export const AtualizarStatusExample = ({ projetoId }: { projetoId: string }) => {
  const { mutate: atualizarStatus, isPending } = useAtualizarStatusProjeto()

  const handleAvancarEtapa = () => {
    atualizarStatus(
      {
        id: projetoId,
        data: {
          novaEtapa: EtapaProjeto.ETAPA_2,
        },
      },
      {
        onSuccess: () => {
          alert('Status atualizado com sucesso!')
        },
        onError: (error) => {
          alert(`Erro ao atualizar status: ${error.message}`)
        },
      }
    )
  }

  return (
    <button onClick={handleAvancarEtapa} disabled={isPending}>
      {isPending ? 'Atualizando...' : 'Avançar para Etapa 2'}
    </button>
  )
}

// ============================================
// Exemplo 6: Adicionar Documento
// ============================================

export const AdicionarDocumentoExample = ({ projetoId }: { projetoId: string }) => {
  const { mutate: adicionarDocumento, isPending } = useAdicionarDocumento()

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Converter arquivo para base64
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(',')[1]
      
      adicionarDocumento(
        {
          id: projetoId,
          data: {
            nomeDocumento: file.name,
            conteudoBase64: base64,
          },
        },
        {
          onSuccess: () => {
            alert('Documento adicionado com sucesso!')
          },
          onError: (error) => {
            alert(`Erro ao adicionar documento: ${error.message}`)
          },
        }
      )
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <input type="file" onChange={handleUpload} disabled={isPending} />
      {isPending && <span>Enviando...</span>}
    </div>
  )
}

// ============================================
// Exemplo 7: Hook Composto (Todas as Operações)
// ============================================

export const ProjetoCompletExample = ({ projetoId }: { projetoId: string }) => {
  const {
    projeto,
    isLoading,
    error,
    atualizarProjeto,
    atualizarStatus,
    adicionarDocumento,
    isUpdating,
    isAddingDocument,
  } = useProjetoOperations(projetoId)

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error.message}</div>
  if (!projeto) return <div>Projeto não encontrado</div>

  return (
    <div>
      <h1>{projeto.titulo}</h1>
      
      <button
        onClick={() =>
          atualizarProjeto({
            titulo: 'Novo Título',
            inicioPrevisto: projeto.inicioPrevisto,
            terminoPrevisto: projeto.terminoPrevisto,
          })
        }
        disabled={isUpdating}
      >
        Atualizar Título
      </button>

      <button
        onClick={() =>
          atualizarStatus({
            novaEtapa: EtapaProjeto.ETAPA_3,
          })
        }
        disabled={isUpdating}
      >
        Avançar Etapa
      </button>

      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return

          const reader = new FileReader()
          reader.onloadend = () => {
            adicionarDocumento({
              nomeDocumento: file.name,
              conteudoBase64: reader.result?.toString().split(',')[1],
            })
          }
          reader.readAsDataURL(file)
        }}
        disabled={isAddingDocument}
      />
    </div>
  )
}
