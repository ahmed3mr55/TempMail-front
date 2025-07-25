"use client";
import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import Alert from './Alert';

const CustomEmail = ({ onClose, expires }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subdomain, setSubdomain] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subdomain.trim()) {
      setError('Please enter a valid email name');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const req =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tempMail/generate/${subdomain}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ttl: expires }),
        credentials: 'include',
      });
      const res = await req.json();
      if (!req.ok) {
        setError(res.error || 'Failed to create email');
        return;
      }
      onClose();
      location.href = '/inbox';
    } catch (err) {
      setError('Failed to create email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Create Custom Email</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700">
            Email Name
          </label>
          <div className="flex items-center">
            <input
              id="subdomain"
              type="text"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              placeholder="Enter custom name"
              className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <span className="bg-gray-100 border border-gray-300 border-l-0 rounded-r-lg p-2 text-gray-600">
              @in.misho.cfd
            </span>
          </div>
          {expires && (
            <p className="text-xs text-gray-500">
              Expires in: <span className="font-medium">{expires}</span>
            </p>
          )}

          {error && <Alert message={error} type="error" />}
        </div>

        {/* Actions */}
        <div className="p-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Create Email'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomEmail;
