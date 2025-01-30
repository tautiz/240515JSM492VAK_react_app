import { useState, useEffect } from 'react';
const PostsWithAbort = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', { signal });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPosts(data.slice(0, 5));
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setPosts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    return () => controller.abort();
  }, []);

  return (
    <div className="w-auto min-w-[300px] mx-auto my-8 bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Recent Posts</h2>
      </div>
      
      <div className="h-96 overflow-y-auto">
        {loading && (
          <div className="p-6 text-center text-gray-500">Loading posts...</div>
        )}
        
        {error && (
          <div className="p-6 text-center text-red-500">{error}</div>
        )}

        {!loading && !error && posts.map(post => (
          <article 
            key={post.id}
            className="p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
            <p className="text-gray-600 line-clamp-2 text-sm">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostsWithAbort;