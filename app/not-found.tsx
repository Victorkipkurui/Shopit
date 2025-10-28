'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-semibold mb-4">404 - Page Not Found</h1>
      <p className="text-sm text-slate-600 mb-8">Sorry, the page you are looking for does not exist.</p>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Go Back
        </Button>

        <Button
          onClick={() => router.push('/')}
          className="flex items-center gap-2"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}