'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';

const LoginForm = dynamic(() => import('./LoginForm'), {
  ssr: false,
});

export default function LoginFormWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <LoginForm />
    </Suspense>
  );
}
