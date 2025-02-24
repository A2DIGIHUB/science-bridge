import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import { BlogList } from './components/blog/BlogList';
import { BlogPost } from './components/blog/BlogPost';
import { BlogCreate } from './components/blog/BlogCreate';
import { RequireAuthor } from './components/auth/RequireAuthor';
import { AuthCallback } from './components/auth/AuthCallback';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route 
        path="/blog/create" 
        element={
          <RequireAuthor>
            <BlogCreate />
          </RequireAuthor>
        } 
      />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
