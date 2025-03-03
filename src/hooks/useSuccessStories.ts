import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface SuccessStory {
  id: string;
  full_name: string;
  role: string;
  company: string;
  avatar_url: string;
  story: string;
  disability_type: string;
  years_of_experience: string;
  created_at: string;
}

export function useSuccessStories() {
  const [stories, setStories] = useState<SuccessStory[]>([])
  const [loading, setLoading] = useState(true)

  const fetchStories = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setStories(data || [])
    } catch (error) {
      console.error('Error fetching success stories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  return { stories, loading }
} 