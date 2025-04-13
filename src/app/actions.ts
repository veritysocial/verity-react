'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';
import { v4 } from 'uuid';

export async function createPost(formData: FormData) {
  const userId = (await auth()).userId;

  if (!userId) {
    return;
  }

  const content = formData.get('content') as string;

  // Save the post in the db
  const id = v4();
  const now = new Date();
  await db.insert(posts).values({
    content,
    createdAt: now,
    framework: 'react',
    id,
    user: userId,
  });

  // Tell next.js to update the page
  revalidatePath('/');
}
