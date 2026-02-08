import Queue from 'bull';

export const processQueue = new Queue('document-processing', {
  redis: { host: 'localhost', port: 6379 },
});

// Define processor in instrumentation or separate worker
