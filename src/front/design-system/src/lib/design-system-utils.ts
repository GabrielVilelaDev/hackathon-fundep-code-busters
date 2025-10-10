/**
 * Utilitário para formatar datas
 */
export const dateUtils = {
  format: (date: Date | string, locale = "pt-BR"): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(dateObj);
  },

  formatWithTime: (date: Date | string, locale = "pt-BR"): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(dateObj);
  },

  isValid: (date: Date | string): boolean => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    return dateObj instanceof Date && !isNaN(dateObj.getTime());
  }
};
