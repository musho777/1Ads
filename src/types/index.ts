export interface Campaign {
  id: string;
  name: string;
  budget: number;
  spent: number;
  status: 'active' | 'paused' | 'completed' | 'pending';
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  ctr: number;
  cpm: number;
  adContent: {
    title: string;
    description: string;
    imageUrl: string;
    targetUrl: string;
    mediaType: 'image' | 'video';
    thumbnailUrl?: string;
  };
  moderationStatus?: 'pending' | 'approved' | 'rejected';
  moderationNote?: string;
  targetCountries: string[];
  paymentStatus?: {
    verified: boolean;
    documents?: {
      id: string;
      type: 'receipt' | 'invoice' | 'transfer';
      url: string;
      date: string;
      amount: number;
    }[];
  };
}

export interface BudgetIncrease {
  id: string;
  userId: string;
  userEmail: string;
  amount: number;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  receipt: {
    url: string;
    uploadDate: string;
  };
}

export interface AdStats {
  daily: {
    date: string;
    impressions: number;
    clicks: number;
    spent: number;
  }[];
  total: {
    impressions: number;
    clicks: number;
    spent: number;
  };
}