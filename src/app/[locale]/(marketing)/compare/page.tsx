import { Suspense } from 'react';
import CompareContent from './compare-content';
import { MOCK_CLINICS } from '@/lib/constants/mock-data';

export default function ComparePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}
