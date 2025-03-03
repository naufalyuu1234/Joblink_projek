import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

// Base interface untuk data dari database
interface VideoBase {
  id: string;
  title: string;
  description: string;
  video_url: string;
  category: string;
  duration: string;
  views: number;
  created_at: string;
}

// Extended interface dengan thumbnail_url
interface VideoWithThumbnail extends VideoBase {
  thumbnail_url: string;
}

// Fungsi untuk mendapatkan YouTube video ID
export const getYoutubeVideoId = (url: string) => {
  try {
    // Handle youtu.be format
    if (url.includes('youtu.be')) {
      const urlObj = new URL(url);
      return urlObj.pathname.slice(1).split('?')[0];
    }
    
    // Handle youtube.com format
    if (url.includes('youtube.com')) {
      const urlObj = new URL(url);
      return urlObj.searchParams.get('v');
    }

    return null;
  } catch (error) {
    console.error('Error parsing YouTube URL:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan thumbnail URL dari video ID
const getYoutubeThumbnail = (url: string) => {
  const videoId = getYoutubeVideoId(url);
  if (!videoId) {
    console.log('Invalid YouTube URL:', url);
    return '';
  }
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

export function useVideos() {
  const [videos, setVideos] = useState<VideoWithThumbnail[]>([])
  const [loading, setLoading] = useState(true)

  const openVideo = (url: string) => {
    window.open(url, '_blank');
  };

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      // Tambahkan thumbnail URL untuk setiap video
      const videosWithThumbnails: VideoWithThumbnail[] = (data || []).map((video: VideoBase) => {
        const thumbnail = getYoutubeThumbnail(video.video_url);
        return {
          ...video,
          thumbnail_url: thumbnail
        };
      })
      
      setVideos(videosWithThumbnails)
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  return { videos, loading, openVideo }
} 