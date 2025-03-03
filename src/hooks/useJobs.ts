import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface SearchParams {
  title?: string;
  location?: string;
}

export function useJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchJobs = async (params?: SearchParams) => {
    try {
      setLoading(true)
      let query = supabase
        .from('jobs')
        .select('*')
        
      // Add search filters if params exist
      if (params?.title) {
        query = query.or(`title.ilike.%${params.title}%,company.ilike.%${params.title}%`)
      }
      
      if (params?.location) {
        query = query.ilike('location', `%${params.location}%`)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return { jobs, loading, fetchJobs }
} 