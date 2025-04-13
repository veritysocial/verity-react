import Post from '@/components/post';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { clerkClient } from '@clerk/nextjs/server';
import { SignedIn } from '@clerk/nextjs';
import { createPost } from '@/app/actions';
import { desc } from 'drizzle-orm';

const ctx = await clerkClient();

export default async function Home() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return (
    <main className="min-h-screen w-full pt-8">
      <SignedIn>
        <form action={createPost}>
          <Card className="border-primary mx-auto w-11/12 rounded-lg md:w-1/2">
            <CardHeader>
              <CardTitle>Create Post</CardTitle>
              <CardDescription>
                Posting from Verity <span className="font-bold text-[#66DBFB]">React</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea name="content" id="content" placeholder="Share your thoughts with the world!" />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="cursor-pointer">
                Post!
              </Button>
            </CardFooter>
          </Card>
        </form>
      </SignedIn>
      <div className="mt-8 flex flex-col gap-4 pb-8">
        {allPosts.map(async (post) => {
          const user = await ctx.users.getUser(post.user);

          return (
            <Post
              key={post.id}
              post={{
                ...post,
                username: user.username!,
                image: user.imageUrl,
              }}
            />
          );
        })}
      </div>
    </main>
  );
}
