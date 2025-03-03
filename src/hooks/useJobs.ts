import { useState } from 'react'
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
}

interface JobFilters {
  title?: string;
  location?: string;
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  const fetchJobs = async (filters?: JobFilters) => {
    try {
      setLoading(true)
      console.log('Fetching jobs with filters:', filters)

      let query = supabase
        .from('jobs')
        .select('*')

      if (filters?.title) {
        query = query.ilike('title', `%${filters.title}%`)
      }
      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }

      query = query.order('created_at', { ascending: false })

      const { data, error } = await query

      if (error) {
        console.error('Supabase query error:', error)
        throw error
      }

      console.log('Jobs fetched:', data)
      setJobs(data || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  return { jobs, loading, fetchJobs }
} 