import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { TPostClient } from '@/lib/db/schema';
import Image from 'next/image';
import Link from 'next/link';

const frameWorkColors = {
  svelte: 'text-[#FF3E00]',
  react: 'text-[#66DBFB]',
  solid: 'text-[#315A99]',
  vue: 'text-[#3FB27F]',
};

export default function Post({ post }: { post: TPostClient }) {
  return (
    <Card className="border-primary mx-auto w-11/12 rounded-lg md:w-1/2">
      <CardHeader>
        <CardTitle className="flex items-center justify-start gap-2 font-normal">
          <Image
            className="rounded-full"
            src={post.image}
            alt={`verity user @${post.username}'s profile photo`}
            width={20}
            height={20}
          />
          <div>
            <Link href={`/user/${post.username}`} className="font-bold">
              @{post.username}
            </Link>
            <span className="text-muted-foreground"> on Verity </span>
            <span className={`${frameWorkColors[post.framework]} font-bold`}>
              {post.framework.charAt(0).toUpperCase() + post.framework.slice(1)}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xl">{post.content}</CardContent>
      <CardFooter className="text-muted-foreground text-sm font-light">
        {post.createdAt.toLocaleDateString(undefined, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </CardFooter>
    </Card>
  );
}
