import type {
  AdicionarDocumentoDto,
  AtualizarProjetoDto,
  AtualizarStatusDto,
  ImportarProjetoDto,
  ProjetoResponse,
  RubricaResponse,
} from "../types/projeto.types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

class ProjetoApiService {
  /**
   * Importar/Criar um novo projeto
   */
  async importarProjeto(dto: ImportarProjetoDto): Promise<{ id: string }> {
    const response = await fetch(`${API_BASE_URL}/projetos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao importar projeto");
    }

    return response.json();
  }

  /**
   * Obter projeto por ID
   */
  async obterProjeto(id: string): Promise<ProjetoResponse> {
    const response = await fetch(`${API_BASE_URL}/projetos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Projeto não encontrado");
      }
      throw new Error("Erro ao buscar projeto");
    }

    return response.json();
  }

  /**
   * Atualizar informações do projeto
   */
  async atualizarProjeto(
    id: string,
    dto: AtualizarProjetoDto
  ): Promise<{ mensagem: string }> {
    const response = await fetch(`${API_BASE_URL}/projetos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Projeto não encontrado");
      }
      const error = await response.json();
      throw new Error(error.message || "Erro ao atualizar projeto");
    }

    return response.json();
  }

  /**
   * Atualizar status/etapa do projeto
   */
  async atualizarStatus(id: string, dto: AtualizarStatusDto): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/projetos/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Projeto não encontrado");
      }
      throw new Error("Erro ao atualizar status do projeto");
    }
  }

  /**
   * Adicionar documento ao projeto
   */
  async adicionarDocumento(
    id: string,
    dto: AdicionarDocumentoDto
  ): Promise<{ mensagem: string }> {
    const response = await fetch(`${API_BASE_URL}/projetos/${id}/documentos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Projeto não encontrado");
      }
      const error = await response.json();
      throw new Error(error.message || "Erro ao adicionar documento");
    }

    return response.json();
  }

  /**
   * Listar todos os projetos
   */
  async listarProjetos(): Promise<ProjetoResponse[]> {
    const response = await fetch(`${API_BASE_URL}/projetos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao listar projetos");
    }

    return response.json();
  }

  /**
   * Listar todas as rubricas disponíveis
   */
  async listarRubricas(): Promise<RubricaResponse[]> {
    const response = await fetch(`${API_BASE_URL}/rubricas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao listar rubricas");
    }

    return response.json();
  }

  /**
   * Converter arquivo para Base64
   */
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        // Remove o prefixo "data:*/*;base64,"
        const base64Content = base64.split(",")[1];
        resolve(base64Content);
      };
      reader.onerror = (error) => reject(error);
    });
  }
}

export const projetoApi = new ProjetoApiService();
