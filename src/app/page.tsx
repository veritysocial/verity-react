'use client';

import { TPostClient } from '@/lib/db/schema';
import { useState, useEffect } from 'react';
import { ofetch } from 'ofetch';
import Post from '@/components/post';
import PostForm from '@/components/postForm';
import { socket } from '@/components/socket';

export default function Home() {
  const [storedPosts, setStoredPosts] = useState<TPostClient[]>([]);
  const [localPosts, setLocalPosts] = useState<TPostClient[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await ofetch('/api/getPosts');
      setStoredPosts(result);
    }
    fetchData();
  }, []);

  socket.on('post', async (e: TPostClient) => {
    console.debug(e);
    setLocalPosts([e, ...localPosts]);
  });

  return (
    <main className="pt-8">
      <PostForm />
      <div className="mt-8 flex flex-col gap-4 pb-8">
        {/* Posts from the websocket */}
        {localPosts.map((post) => (
          <Post
            post={{
              ...post,
              createdAt: new Date(post.createdAt),
            }}
            key={post.id}
          />
        ))}

        {/* Posts grabbed on load */}
        {storedPosts.map((post) => (
          <Post
            post={{
              ...post,
              createdAt: new Date(post.createdAt),
            }}
            key={post.id}
          />
        ))}
      </div>
    </main>
  );
}
