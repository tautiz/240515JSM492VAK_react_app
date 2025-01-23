import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function Posts2() {
    const { data: posts, error, isLoading } = useQuery({
        queryKey: ['posts'],  // Query key should be an array or a string
        queryFn: () => axios.get('https://jsonplaceholder.typicode.com/posts').then(res => res.data)
    });


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4 max-w-full">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Posts</h1>
            <div className="max-h-[80vh] overflow-y-auto pr-2">
                <ul className="space-y-3">
                    {posts.map(post => (
                        <li
                            key={post.id}
                            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 cursor-pointer"
                        >
                            <span className="text-sm text-gray-500 mb-1 block">#{post.id}</span>
                            <h2 className="text-gray-800 font-medium leading-snug">
                                {post.title}
                            </h2>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Posts2;
