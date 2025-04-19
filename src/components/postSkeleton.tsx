import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Post() {
  return (
    <Card className="border-primary mx-auto w-11/12 rounded-lg md:w-1/2">
      <CardHeader>
        <CardTitle className="flex items-center justify-start gap-2 font-normal">
          <Skeleton className="h-5 w-5 rounded-full"></Skeleton>
          <Skeleton className="h-4 w-44"></Skeleton>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xl">
        <div className="space-y-2">
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-3 w-1/3" />
      </CardFooter>
    </Card>
  );
}
