import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export enum SubscriptionRate {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export type Subscription = {
  id: string;
  name: string;
  description?: string;
  price: number;
  rate: SubscriptionRate;
};

export type CreateSubscription = Pick<
  Subscription,
  'name' | 'description' | 'price' | 'rate'
>;

type SubscriptionStore = {
  subscriptions: Subscription[];
  findSubscription: (id: string) => Subscription | undefined;
  createSubscription: (sub: CreateSubscription) => void;
  updateSubscription: (sub: Subscription) => void;
  removeSubscription: (id: string) => void;
};

export const useSubscriptionsStore = create<SubscriptionStore>()(
  devtools(
    persist(
      (set, get) => ({
        subscriptions: [],
        findSubscription: (id: string) =>
          get().subscriptions.find((s) => s.id === id),
        createSubscription: (sub: CreateSubscription) =>
          set((state) => ({
            ...state,
            subscriptions: [...state.subscriptions, { ...sub, id: uuidv4() }],
          })),
        updateSubscription: (sub: Subscription) =>
          set((state) => ({
            ...state,
            subscriptions: state.subscriptions.map((s) => {
              if (s.id === sub.id) {
                return sub;
              } else {
                return s;
              }
            }),
          })),
        removeSubscription: (id: string) =>
          set((state) => ({
            ...state,
            subscriptions: state.subscriptions.filter((s) => s.id !== id),
          })),
      }),
      {
        name: 'subscriptions',
      }
    )
  )
);
