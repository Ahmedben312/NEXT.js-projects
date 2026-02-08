import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { processQueue } from '@/lib/queue';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const tags = (formData.get('tags') as string) || '';

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const docId = uuidv4();

    // Queue each file for background processing
    for (const file of files) {
      await processQueue.add('process-document', {
        docId,
        filename: file.name,
        tags: tags.split(',').map(t => t.trim()),
        // In real app: store file in S3 / temp folder and pass path
      });
    }

    return NextResponse.json({ message: 'Processing queued', docId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
