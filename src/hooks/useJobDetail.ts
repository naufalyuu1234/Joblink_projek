import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  disability_support: string[];
  created_at: string;
  requirements?: string[] | null;
  responsibilities?: string[] | null;
  benefits?: string[] | null;
  company_description?: string;
  work_hours?: string;
}

export function useJobDetail(jobId: string) {
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single()

        if (error) throw error

        setJob(data)
      } catch (err) {
        console.error('Error fetching job detail:', err)
        setError('Gagal mengambil detail pekerjaan')
      } finally {
        setLoading(false)
      }
    }

    if (jobId) {
      fetchJobDetail()
    }
  }, [jobId])

  return { job, loading, error }
} 