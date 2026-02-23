/** Tamaño máximo permitido: 2 MB */
const MAX_FILE_SIZE = 2 * 1024 * 1024;

/**
 * Convierte un File a un string base64 (data-URL).
 * Rechaza si el archivo supera MAX_FILE_SIZE.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  if (file.size > MAX_FILE_SIZE) {
    return Promise.reject(
      new Error(`El archivo no debe superar los ${MAX_FILE_SIZE / 1024 / 1024} MB`)
    );
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
