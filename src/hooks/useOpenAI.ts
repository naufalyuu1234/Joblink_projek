import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function useOpenAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = async (userMessage: string, jobsData: unknown[]) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          jobsData: jobsData
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error generating response:', err);
      setError('Terjadi kesalahan saat memproses permintaan Anda');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateResponse, loading, error };
} 