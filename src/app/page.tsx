import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  return (
    <main className="dark bg-background min-h-screen w-full pt-8">
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
    </main>
  );
}
