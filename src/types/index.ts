export interface Campaign {
  id: string;
  company_name: string;
  budget: string;
  spent: string;
  status: 'active' | 'paused' | 'completed' | 'pending';
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  ctr: number;
  CPM: number;
  moderationStatus?: 'pending' | 'approved' | 'rejected';
  moderationNote?: string;
  targetCountries: string[];
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