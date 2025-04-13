import { db } from '@/lib/db';
import { posts, TPostClient } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { clerkClient } from '@clerk/nextjs/server';

const ctx = await clerkClient();

export async function GET() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  const clientPosts: TPostClient[] = [];

  // Replace the user IDs with useful details
  for (const post of allPosts) {
    // BE CAREFUL TO NOT RETURN THE CLERK OBJECT, THAT WILL
    // LEAK SENSITIVE DATA SUCH AS EMAILS & PHONE NUMBERS
    const userData = await ctx.users.getUser(post.user);
    clientPosts.push({
      ...post,
      username: userData.username!,
      image: userData.imageUrl,
    });
  }

  return Response.json(clientPosts);
}
