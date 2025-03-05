import { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});





export function useOpenAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = async (userMessage: string, jobsData: unknown[]) => {
    try {
      setLoading(true);
      setError(null);

      const prompt = `
        Sebagai AI Asisten Karir Inklusif, Anda harus sangat berhati-hati dan konsisten dalam merekomendasikan pekerjaan yang sesuai dengan kebutuhan disabilitas spesifik.

        Berikut adalah daftar pekerjaan yang tersedia:
        ${JSON.stringify(jobsData)}

        Pesan pengguna: "${userMessage}"

        Panduan analisis:
        1. Analisis setiap pekerjaan dengan sangat teliti berdasarkan:
           - Deskripsi pekerjaan
           - Persyaratan pekerjaan
           - Dukungan disabilitas yang ditawarkan
           - Tipe pekerjaan (remote/onsite)
           - Aksesibilitas tempat kerja

        2. Pemetaan istilah disabilitas yang sama:
           - "Tunadaksa" = "Pengguna kursi roda" = "Disabilitas fisik"
           - "Tunanetra" = "Buta" = "Disabilitas penglihatan"
           - "Tunarungu" = "Tuli" = "Disabilitas pendengaran"
           Jika user menggunakan salah satu istilah di atas, perlakukan sama dengan istilah yang setara.

        3. Kriteria kesesuaian pekerjaan:
           a. Untuk tunadaksa/pengguna kursi roda:
              - Pastikan ada akses kursi roda
              - Pertimbangkan pekerjaan remote/WFH
              - Periksa dukungan "Wheelchair Accessible" di disability_support
              - Hindari pekerjaan yang membutuhkan mobilitas tinggi
           
           b. Untuk tunanetra:
              - Hindari pekerjaan yang membutuhkan kemampuan visual
              - Pastikan ada dukungan screen reader
              - Utamakan pekerjaan berbasis audio/verbal
           
           c. Untuk tunarungu:
              - Hindari pekerjaan yang bergantung pada komunikasi verbal
              - Pastikan ada dukungan bahasa isyarat
              - Utamakan pekerjaan yang fokus pada komunikasi tertulis

        4. Jika TIDAK ADA pekerjaan yang benar-benar sesuai dengan kebutuhan disabilitas user, 
           WAJIB mengembalikan array recommendations kosong.

        Berikan rekomendasi dalam format JSON:
        {
          "response": "Baik, saya sudah menganalisis pekerjaan yang sesuai dengan kebutuhan Anda. Silakan cek section Rekomendasi Pekerjaan Inklusif di sebelah kanan untuk melihat pekerjaan yang saya rekomendasikan. [Jika tidak ada yang sesuai: Mohon maaf, saat ini belum ada lowongan yang sesuai dengan kebutuhan Anda. (tambahkan alasan spesifik)]",
          "recommendations": [
            {
              "id": "id pekerjaan",
              "title": "judul pekerjaan",
              "company": "nama perusahaan",
              "type": "tipe pekerjaan"
            }
          ]
        }

        Format response yang BENAR:
        - "Saya sudah menemukan beberapa pekerjaan yang sesuai dengan kebutuhan Anda. Silakan cek section Rekomendasi Pekerjaan Inklusif di sebelah kanan untuk melihat detailnya."
        - "Berdasarkan analisis saya, ada beberapa posisi yang cocok untuk Anda. Anda bisa melihat rekomendasinya di section Rekomendasi Pekerjaan Inklusif."

        Format response yang SALAH (JANGAN GUNAKAN):
        - "Berikut adalah rekomendasi pekerjaan untuk..."
        - "Saya merekomendasikan pekerjaan berikut..."
        - "Berikut daftar pekerjaan yang sesuai..."

        PENTING: 
        1. Lebih baik tidak merekomendasikan pekerjaan sama sekali daripada merekomendasikan pekerjaan yang tidak sesuai.
        2. Berikan rekomendasi yang konsisten untuk jenis disabilitas yang sama, terlepas dari istilah yang digunakan user.
        3. Maksimal 3 rekomendasi pekerjaan yang paling sesuai.
        4. SELALU arahkan user untuk melihat rekomendasi di section sebelah kanan, JANGAN sebutkan pekerjaan dalam response.
      `;

      console.log('Prompt:', prompt);
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 1000,
      });

      const response = completion.choices[0].message.content;
      return JSON.parse(response || '{}');
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