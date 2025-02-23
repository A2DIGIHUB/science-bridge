import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { BlogList } from './components/blog/BlogList';
import { BlogPost } from './components/blog/BlogPost';
import { BlogCreate } from './components/blog/BlogCreate';
import { RequireAuthor } from './components/auth/RequireAuthor';
import { AuthCallback } from './components/auth/AuthCallback';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-[120px]"> {/* Adjusted padding-top to account for both navbar layers */}
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/blog" element={<BlogList />} />
              <Route 
                path="/blog/create" 
                element={
                  <RequireAuthor>
                    <BlogCreate />
                  </RequireAuthor>
                } 
              />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;