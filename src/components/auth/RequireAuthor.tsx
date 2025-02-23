import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export function RequireAuthor({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function checkAuthorStatus() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('authors')
          .select('*')
          .eq('credentials', user.email)
          .single();
        
        setIsAuthor(!!data);
      }
      setLoading(false);
    }
    
    checkAuthorStatus();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8">Checking authorization...</div>;
  }

  if (!isAuthor) {
    return <Navigate to="/blog" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
