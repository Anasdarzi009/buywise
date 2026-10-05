import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import './App.css';

// Code-split route components for optimal performance & instant load
const HomePage = lazy(() => import('./pages/HomePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ProductReviewPage = lazy(() => import('./pages/ProductReviewPage'));
const BuyingGuidePage = lazy(() => import('./pages/BuyingGuidePage'));
const DealsPage = lazy(() => import('./pages/DealsPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AffiliateDisclosurePage = lazy(() => import('./pages/AffiliateDisclosurePage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Lightweight, accessible loading fallback
function PageFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center py-16" role="status" aria-label="Loading page">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-medium text-slate-400">Loading...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageFallback />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="category/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <CategoryPage />
              </Suspense>
            }
          />
          <Route
            path="review/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <ProductReviewPage />
              </Suspense>
            }
          />
          <Route
            path="guides/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <BuyingGuidePage />
              </Suspense>
            }
          />
          <Route
            path="guide/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <BuyingGuidePage />
              </Suspense>
            }
          />
          <Route
            path="buying-guide/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <BuyingGuidePage />
              </Suspense>
            }
          />
          <Route
            path="deals"
            element={
              <Suspense fallback={<PageFallback />}>
                <DealsPage />
              </Suspense>
            }
          />
          <Route
            path="search"
            element={
              <Suspense fallback={<PageFallback />}>
                <SearchPage />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageFallback />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<PageFallback />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="affiliate-disclosure"
            element={
              <Suspense fallback={<PageFallback />}>
                <AffiliateDisclosurePage />
              </Suspense>
            }
          />
          <Route
            path="privacy-policy"
            element={
              <Suspense fallback={<PageFallback />}>
                <PrivacyPolicyPage />
              </Suspense>
            }
          />
          <Route
            path="terms"
            element={
              <Suspense fallback={<PageFallback />}>
                <TermsPage />
              </Suspense>
            }
          />
          <Route
            path="404"
            element={
              <Suspense fallback={<PageFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
