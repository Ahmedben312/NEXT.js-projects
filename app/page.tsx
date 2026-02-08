'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react'; // Optional: add lucide-react for spinner (run npm install lucide-react first)

export default function Simulator() {
  const [omega, setOmega] = useState(1.0);
  const [zeta, setZeta] = useState(0.05);
  const [amplitude, setAmplitude] = useState(1.0);
  const [tEnd, setTEnd] = useState(20.0);
  const [points, setPoints] = useState(1000);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setData(null);

    const formData = new FormData();
    formData.append('omega', omega.toString());
    formData.append('zeta', zeta.toString());
    formData.append('amplitude', amplitude.toString());
    formData.append('t_end', tEnd.toString());
    formData.append('points', points.toString());
    if (file) formData.append('file', file);

    try {
      const res = await fetch('/api/py/simulate', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      alert('Simulation failed – check console (F12) for details');
    }
    setLoading(false);
  };

  const chartData = data?.simulation?.time.map((t: number, i: number) => ({
    time: t.toFixed(2),
    simulation: data.simulation.position[i],
    experimental: data.experimental?.position[i] ?? null,
  })) ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-indigo-900 mb-12">
          Physics Simulation Dashboard
        </h1>
        <p className="text-center text-gray-700 mb-10 text-lg">
          Damped Harmonic Oscillator – Compare theoretical simulation with experimental data
        </p>

        <div className="bg-white rounded-2xl shadow-2xl p-10">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Natural Frequency ω (rad/s)
              </label>
              <input
                type="number"
                step="0.1"
                value={omega}
                onChange={e => setOmega(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Damping Ratio ζ
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={zeta}
                onChange={e => setZeta(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-gray-500 mt-1">0 = no damping, 1 = critical, >1 = overdamped</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Initial Amplitude (m)
              </label>
              <input
                type="number"
                step="0.1"
                value={amplitude}
                onChange={e => setAmplitude(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Time Duration (s)
              </label>
              <input
                type="number"
                step="1"
                value={tEnd}
                onChange={e => setTEnd(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Points
              </label>
              <input
                type="number"
                step="100"
                min="100"
                value={points}
                onChange={e => setPoints(parseInt(e.target.value) || 1000)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experimental Data (CSV)
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={e => setFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
              />
              <p className="text-xs text-gray-500 mt-1">Columns: time, position</p>
            </div>

            <div className="md:col-span-2 lg:col-span-3 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg"
              >
                {loading && <Loader2 className="animate-spin" size={24} />}
                {loading ? 'Running Simulation...' : 'Run Simulation'}
              </button>
            </div>
          </form>

          {data && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-center text-indigo-900 mb-8">Results</h2>
              <ResponsiveContainer width="100%" height={500}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
                  <XAxis dataKey="time" label={{ value: 'Time (s)', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: 'Position (m)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value: number) => value.toFixed(4)} />
                  <Legend verticalAlign="top" height={40} />
                  <Line type="monotone" dataKey="simulation" stroke="#4f46e5" name="Simulation" strokeWidth={3} dot={false} />
                  {data.experimental && (
                    <Line type="monotone" dataKey="experimental" stroke="#dc2626" name="Experimental Data" strokeWidth={3} dot={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}