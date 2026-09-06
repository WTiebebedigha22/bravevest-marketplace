import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/layouts/Toaster';
import { AuthProvider } from './features/auth/context/AuthContext';
import { ProtectedRoute } from './lib/roleGuard';
import { PublicLayout } from './components/layouts/PublicLayout';
import { InvestorLayout } from './components/layouts/InvestorLayout';
import { BorrowerLayout } from './components/layouts/BorrowerLayout';
import { AdminLayout } from './components/layouts/AdminLayout';

// Lazy load pages
const HomePage = lazy(() => import('./routes/public/HomePage'));
const OpportunitiesListPage = lazy(() => import('./routes/public/OpportunitiesListPage'));
const OpportunityDetailPage = lazy(() => import('./routes/public/OpportunityDetailPage'));
const HowItWorksPage = lazy(() => import('./routes/public/HowItWorksPage'));
const AboutPage = lazy(() => import('./routes/public/AboutPage'));
const LoginPage = lazy(() => import('./routes/auth/LoginPage'));
const RegisterPage = lazy(() => import('./routes/auth/RegisterPage'));
const TwoFactorPage = lazy(() => import('./routes/auth/TwoFactorPage'));

const KycOnboardingPage = lazy(() => import('./routes/investor/KycOnboardingPage'));
const DashboardPage = lazy(() => import('./routes/investor/DashboardPage'));
const WalletPage = lazy(() => import('./routes/investor/WalletPage'));
const SubscriptionDetailPage = lazy(() => import('./routes/investor/SubscriptionDetailPage'));
const CofundPage = lazy(() => import('./routes/investor/CofundPage'));
const ReportsPage = lazy(() => import('./routes/investor/ReportsPage'));

const BorrowerKycPage = lazy(() => import('./routes/borrower/KycPage'));
const ApplyPage = lazy(() => import('./routes/borrower/ApplyPage'));
const ApplicationDetailPage = lazy(() => import('./routes/borrower/ApplicationDetailPage'));
const RepaymentsPage = lazy(() => import('./routes/borrower/RepaymentsPage'));

const OpportunityPipelinePage = lazy(() => import('./routes/admin/OpportunityPipelinePage'));
const OpportunityReviewPage = lazy(() => import('./routes/admin/OpportunityReviewPage'));
const KycQueuePage = lazy(() => import('./routes/admin/KycQueuePage'));
const LoanApplicationsPage = lazy(() => import('./routes/admin/LoanApplicationsPage'));
const PayoutsPage = lazy(() => import('./routes/admin/PayoutsPage'));
const AdminReportsPage = lazy(() => import('./routes/admin/ReportsPage'));
const AuditLogsPage = lazy(() => import('./routes/admin/AuditLogsPage'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-brave-teal"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/opportunities" element={<OpportunitiesListPage />} />
              <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/2fa" element={<TwoFactorPage />} />

            <Route element={<ProtectedRoute allowedRoles={['investor']} />}>
              <Route element={<InvestorLayout />}>
                <Route path="/investor/kyc" element={<KycOnboardingPage />} />
                <Route path="/investor/dashboard" element={<DashboardPage />} />
                <Route path="/investor/wallet" element={<WalletPage />} />
                <Route path="/investor/subscriptions/:id" element={<SubscriptionDetailPage />} />
                <Route path="/investor/cofund" element={<CofundPage />} />
                <Route path="/investor/reports" element={<ReportsPage />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['borrower']} />}>
              <Route element={<BorrowerLayout />}>
                <Route path="/borrower/kyc" element={<BorrowerKycPage />} />
                <Route path="/borrower/apply" element={<ApplyPage />} />
                <Route path="/borrower/applications/:id" element={<ApplicationDetailPage />} />
                <Route path="/borrower/repayments" element={<RepaymentsPage />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin', 'committee']} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/opportunities" element={<OpportunityPipelinePage />} />
                <Route path="/admin/opportunities/:id/review" element={<OpportunityReviewPage />} />
                <Route path="/admin/kyc-queue" element={<KycQueuePage />} />
                <Route path="/admin/loan-applications" element={<LoanApplicationsPage />} />
                <Route path="/admin/payouts" element={<PayoutsPage />} />
                <Route path="/admin/reports" element={<AdminReportsPage />} />
                <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;