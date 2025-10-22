import { useState, useEffect } from 'react';

export interface UserData {
  id: string;
  username: string;
  name: string;
  surname: string;
  avatar: string;
  cover: string;
  bio?: string;
  website?: string;
  location?: string;
  _count: {
    posts: number;
    followers: number;
    followings: number;
  };
}

export function useUserData(username: string) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/users/${username}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('User not found');
          }
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchUserData();
    }
  }, [username]);

  return { userData, loading, error };
}