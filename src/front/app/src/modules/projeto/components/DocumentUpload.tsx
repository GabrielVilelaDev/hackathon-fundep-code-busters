import React, { useState } from "react";
import { Upload, X, File } from "lucide-react";
import { projetoApi } from "../services/projetoApi";

interface DocumentUploadProps {
  onFileSelect: (fileName: string, base64Content: string) => void;
  accept?: string;
  maxSizeMB?: number;
}

export function DocumentUpload({
  onFileSelect,
  accept = ".pdf,.doc,.docx,.xls,.xlsx",
  maxSizeMB = 10,
}: DocumentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tamanho
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`Arquivo muito grande. Tamanho máximo: ${maxSizeMB}MB`);
      return;
    }

    setError(null);
    setSelectedFile(file);

    try {
      setUploading(true);
      const base64Content = await projetoApi.fileToBase64(file);
      onFileSelect(file.name, base64Content);
    } catch (err) {
      setError("Erro ao processar arquivo");
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Upload de Documento
      </label>
      
      <div className="flex items-center gap-4">
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
        >
          <Upload className="h-4 w-4" />
          Selecionar Arquivo
        </label>
        <input
          id="file-upload"
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="sr-only"
        />
        
        {selectedFile && (
          <div className="flex items-center gap-2 rounded-md border border-green-500 bg-green-50 px-3 py-2 text-sm text-green-700 dark:border-green-700 dark:bg-green-900/20 dark:text-green-300">
            <File className="h-4 w-4" />
            <span className="max-w-[200px] truncate">{selectedFile.name}</span>
            <span className="text-xs text-gray-500">
              ({(selectedFile.size / 1024).toFixed(2)} KB)
            </span>
            <button
              onClick={handleClear}
              className="ml-2 text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        
        {uploading && (
          <span className="text-sm text-muted-foreground">
            Processando...
          </span>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <p className="text-xs text-muted-foreground">
        Formatos aceitos: {accept}. Tamanho máximo: {maxSizeMB}MB
      </p>
    </div>
  );
}
