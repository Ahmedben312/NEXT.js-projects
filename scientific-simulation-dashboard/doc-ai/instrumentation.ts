import { processQueue } from './lib/queue';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('Starting Bull worker for file processing...');
    // Bull worker is started via process definition in queue.ts
  }
}
