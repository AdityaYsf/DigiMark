import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export async function embedCopyright(formData) {
  const response = await api.post('/embed', formData, {
    responseType: 'blob',
  });
  return response;
}

export async function extractCopyright(formData) {
  const response = await api.post('/extract', formData);
  return response.data;
}
