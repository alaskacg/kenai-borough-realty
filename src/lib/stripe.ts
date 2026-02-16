import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');
  }
  return stripePromise;
};

export const PLATFORM_FEE_PERCENTAGE = 0.03;
export const ESCROW_HOLD_HOURS = 48;

export const calculateFees = (amount: number) => {
  const platformFee = Math.round(amount * PLATFORM_FEE_PERCENTAGE * 100) / 100;
  const sellerAmount = amount - platformFee;
  return { platformFee, sellerAmount };
};
