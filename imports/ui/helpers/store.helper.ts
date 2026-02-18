export const storeHelper = {
  get: <T = any>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error al obtener ${key} del localStorage:`, error);
      return null;
    }
  },

  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error al guardar ${key} en localStorage:`, error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error al eliminar ${key} del localStorage:`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error al limpiar localStorage:', error);
    }
  },
};
