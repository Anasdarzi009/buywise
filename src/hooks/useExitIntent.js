import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Reusable Exit-Intent & Mobile Engagement Detection Hook
 * 
 * Features:
 * - Desktop: Tracks mouse leaving viewport towards the browser top bar
 * - Mobile: Uses time-delayed engagement and scroll-depth triggers
 * - Storage & Cooldown: Tracks session dismissal and configurable day-based cooldown
 * - Configurable flags: POPUP_DELAY, POPUP_COOLDOWN_DAYS, ENABLE_EXIT_INTENT
 */

export const DEFAULT_EXIT_INTENT_CONFIG = {
  // Minimum time on page before desktop exit-intent is armed (prevents immediate annoyance)
  POPUP_DELAY_MS: 6000, 
  // Mobile fallback delay (touch devices don't have mouseleave)
  POPUP_MOBILE_DELAY_MS: 16000,
  // Mobile scroll threshold (percentage of page scrolled)
  POPUP_MOBILE_SCROLL_PERCENT: 40,
  // Cooldown in days before showing again if dismissed
  POPUP_COOLDOWN_DAYS: 5,
  // Master toggle
  ENABLE_EXIT_INTENT: true,
  // Storage keys
  STORAGE_KEY_PREFIX: 'buywise_deals_popup',
};

export function useExitIntent(customConfig = {}) {
  const config = { ...DEFAULT_EXIT_INTENT_CONFIG, ...customConfig };
  const [isOpen, setIsOpen] = useState(false);
  const isArmedRef = useRef(false);
  const hasTriggeredRef = useRef(false);

  // Check if popup should be suppressed based on localStorage or sessionStorage
  const shouldSuppress = useCallback(() => {
    if (!config.ENABLE_EXIT_INTENT) return true;

    try {
      // 1. Check if already permanently subscribed
      const subscribed = localStorage.getItem(`${config.STORAGE_KEY_PREFIX}_subscribed`);
      if (subscribed === 'true') return true;

      // 2. Check if dismissed during current browser session
      const sessionDismissed = sessionStorage.getItem(`${config.STORAGE_KEY_PREFIX}_session_dismissed`);
      if (sessionDismissed === 'true') return true;

      // 3. Check multi-day cooldown
      const dismissedAt = localStorage.getItem(`${config.STORAGE_KEY_PREFIX}_dismissed_at`);
      if (dismissedAt) {
        const elapsedMs = Date.now() - parseInt(dismissedAt, 10);
        const cooldownMs = config.POPUP_COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
        if (elapsedMs < cooldownMs) {
          return true; // Still within cooldown window
        }
      }
    } catch {
      // In case of restricted iframe or blocked storage
      return false;
    }

    return false;
  }, [config.ENABLE_EXIT_INTENT, config.POPUP_COOLDOWN_DAYS, config.STORAGE_KEY_PREFIX]);

  const triggerPopup = useCallback(() => {
    if (hasTriggeredRef.current) return;
    if (shouldSuppress()) return;

    hasTriggeredRef.current = true;
    setIsOpen(true);
  }, [shouldSuppress]);

  // Close and record dismissal
  const closePopup = useCallback((reason = 'dismiss') => {
    setIsOpen(false);
    try {
      // Record session dismissal so it never annoys during current session
      sessionStorage.setItem(`${config.STORAGE_KEY_PREFIX}_session_dismissed`, 'true');

      // Record multi-day cooldown timestamp
      localStorage.setItem(`${config.STORAGE_KEY_PREFIX}_dismissed_at`, Date.now().toString());
    } catch (e) {
      console.warn('Storage error on popup dismissal:', e);
    }
  }, [config.STORAGE_KEY_PREFIX]);

  // Mark as subscribed (permanent suppression)
  const markSubscribed = useCallback((payload = {}) => {
    try {
      localStorage.setItem(`${config.STORAGE_KEY_PREFIX}_subscribed`, 'true');
      localStorage.setItem(`${config.STORAGE_KEY_PREFIX}_subscriber_data`, JSON.stringify({
        ...payload,
        subscribedAt: new Date().toISOString(),
      }));
    } catch (e) {
      console.warn('Storage error on popup subscription:', e);
    }
  }, [config.STORAGE_KEY_PREFIX]);

  // Reset helper for development / testing
  const resetPopupState = useCallback(() => {
    try {
      sessionStorage.removeItem(`${config.STORAGE_KEY_PREFIX}_session_dismissed`);
      localStorage.removeItem(`${config.STORAGE_KEY_PREFIX}_dismissed_at`);
      localStorage.removeItem(`${config.STORAGE_KEY_PREFIX}_subscribed`);
      hasTriggeredRef.current = false;
      isArmedRef.current = true;
    } catch (e) {
      console.warn('Storage reset error:', e);
    }
  }, [config.STORAGE_KEY_PREFIX]);

  useEffect(() => {
    if (shouldSuppress()) return;

    // Detect if device is primary touch/mobile
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);

    // 1. Arm desktop exit intent after minimum delay
    const armTimer = setTimeout(() => {
      isArmedRef.current = true;
    }, config.POPUP_DELAY_MS);

    // 2. Desktop Mouseleave & Top Edge Movement Exit-Intent Listeners
    const handleMouseLeave = (e) => {
      // Trigger if mouse exits towards top of browser window (address bar / tabs)
      if (!isArmedRef.current || hasTriggeredRef.current) return;

      if (e.clientY <= 20 && !e.relatedTarget) {
        triggerPopup();
      }
    };

    const handleMouseMove = (e) => {
      // Trigger when mouse moves within 8px of top browser toolbar
      if (!isArmedRef.current || hasTriggeredRef.current) return;
      if (e.clientY <= 8) {
        triggerPopup();
      }
    };

    // Listen for manual trigger custom events (e.g. from buttons)
    const handleCustomTrigger = () => {
      triggerPopup();
    };
    window.addEventListener('buywise:open_deals_popup', handleCustomTrigger);

    // 3. Mobile Fallbacks: Time delay + Scroll depth
    let mobileTimer = null;
    let handleScroll = null;

    if (isTouchDevice) {
      // Time-based fallback for mobile
      mobileTimer = setTimeout(() => {
        if (!hasTriggeredRef.current && isArmedRef.current) {
          triggerPopup();
        }
      }, config.POPUP_MOBILE_DELAY_MS);

      // Scroll-based fallback for mobile after reasonable reading
      handleScroll = () => {
        if (!isArmedRef.current || hasTriggeredRef.current) return;

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;

        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollPercent >= config.POPUP_MOBILE_SCROLL_PERCENT) {
          triggerPopup();
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      clearTimeout(armTimer);
      if (mobileTimer) clearTimeout(mobileTimer);
      window.removeEventListener('buywise:open_deals_popup', handleCustomTrigger);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      if (handleScroll) window.removeEventListener('scroll', handleScroll);
    };
  }, [
    config.POPUP_DELAY_MS,
    config.POPUP_MOBILE_DELAY_MS,
    config.POPUP_MOBILE_SCROLL_PERCENT,
    shouldSuppress,
    triggerPopup,
  ]);

  return {
    isOpen,
    openPopup: () => setIsOpen(true),
    closePopup,
    markSubscribed,
    resetPopupState,
  };
}

export default useExitIntent;
