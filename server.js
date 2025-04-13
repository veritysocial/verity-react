import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';
import pg from 'pg';
import { loadEnvFile } from 'node:process';
import { createClerkClient } from '@clerk/backend';

loadEnvFile();

const connectionString = process.env.DATABASE_URL;
const ctx = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
const client = new pg.Client({ connectionString });
const channel = 'new_post';
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

async function listenToNotifications(io) {
  try {
    await client.connect();
    client.on('notification', async (msg) => {
      const post = JSON.parse(msg.payload).post;
      const user = await ctx.users.getUser(post.user);

      io.emit('post', {
        ...post,
        createdAt: new Date(post.time),
        username: user.username,
        image: user.imageUrl,
      });
    });

    await client.query(`LISTEN ${channel}`);
    console.log(`Listening for notifications on ${channel}`);
  } catch (e) {
    console.log(e);
  }
}

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });

  listenToNotifications(io).catch(console.error);
});
