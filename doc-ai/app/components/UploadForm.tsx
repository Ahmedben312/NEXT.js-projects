'use client';

import { useState } from 'react';

export default function UploadForm() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('');
  const [docId, setDocId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files?.length) return;

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('files', file));
    formData.append('tags', tags);

    try {
      setStatus('Uploading and queuing...');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok) {
        setStatus('Files queued successfully!');
        if (data.docId) {
          setDocId(data.docId);
        }
      } else {
        setStatus('Error: ' + (data.error || 'Unknown'));
      }
    } catch (err) {
      setStatus('Failed to upload');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 font-medium">PDF Files</label>
        <input
          type="file"
          multiple
          accept="application/pdf"
          onChange={e => setFiles(e.target.files)}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="invoice, contract, 2025, urgent"
          className="w-full p-2.5 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Upload & Process
      </button>

      {status && <p className="text-center mt-4">{status}</p>}
      {docId && (
        <p className="text-center mt-4">
          <a href={`/chat/${docId}`} className="text-blue-600 underline">
            Go to chat → {docId.slice(0, 8)}...
          </a>
        </p>
      )}
    </form>
  );
}
