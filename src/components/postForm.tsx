import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { createPost } from '@/app/actions';
import { SignedIn } from '@clerk/nextjs';

export default function PostForm() {
  return (
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
  );
}
