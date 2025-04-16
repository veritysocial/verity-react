'use server';

import Image from 'next/image';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import { clerkClient } from '@clerk/nextjs/server';
import Post from '@/components/post';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;

  return {
    title: `Verity (React Edition) | @${username}`,
    description:
      'Verify (Vertical + Community) is a project built by April Hall to try out a bunch of' +
      ' different javascript frameworks by making the same app in 5 of them',
  };
}

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const ctx = await clerkClient();
  const { username } = await params;

  const user = (
    await ctx.users.getUserList({
      username: [username],
    })
  ).data[0];

  const userPosts = await db.select().from(posts).orderBy(desc(posts.createdAt)).where(eq(posts.user, user.id));

  return (
    <main>
      <div className="mt-8 flex w-full flex-col items-center justify-center">
        <Image
          src={user.imageUrl}
          alt={`verity user @${username}'s profile photo`}
          height={144}
          width={144}
          className="rounded-full"
        />
        <h1 className="text-foreground text-3xl">@{username}</h1>
      </div>
      <div className="mt-8 flex flex-col gap-4 pb-8">
        {userPosts.map((post) => (
          <Post
            key={post.id}
            post={{
              ...post,
              username,
              image: user.imageUrl,
            }}
          />
        ))}
      </div>
    </main>
  );
}
