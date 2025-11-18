function getApiBaseUrl(): string {
  // In Vite, import.meta.env is available at build time
  // In Jest, we'll mock this function
  return import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';
}

export const API_BASE_URL = getApiBaseUrl();
