import DashboardGate from './DashboardGate';
import { Suspense } from 'react';
import DashboardFallback from './DashboardFallback';

export default function DashboardPage() {
    return (
        <Suspense fallback={<DashboardFallback />}><DashboardGate /></Suspense>
    );
}