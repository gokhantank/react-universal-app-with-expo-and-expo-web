export const TEAMS = ['Engineering Product', 'Engineering', 'Marketing'] as const;
export type Team = (typeof TEAMS)[number];

export interface TeamData {
  overallVibe: string;
  vibeScore: number;
  participation: number;
  monthlyActiveUsers: number;
  kpiData: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  factorData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const teamDataConfig: Record<Team, TeamData> = {
  'Engineering Product': {
    overallVibe: 'Terrible',
    vibeScore: -72,
    participation: 54,
    monthlyActiveUsers: 75,
    kpiData: [
      { label: 'Excitement & Energy', value: 30, color: '#FF6B6B' },
      { label: 'Being connected', value: 85, color: '#4ECDC4' },
      { label: 'Learning & Growth', value: 60, color: '#FFE66D' },
      { label: 'Safety & Comfort', value: 20, color: '#FF6B6B' },
    ],
    factorData: [
      { name: 'EXCITEMENT & ENERGY', value: 30, color: '#FF6B6B' },
      { name: 'LEARNING & GROWTH', value: 60, color: '#FFE66D' },
      { name: 'AUTONOMY & INDEPENDENCE', value: 45, color: '#95E1D3' },
      { name: 'VALUED', value: 55, color: '#F38181' },
      { name: 'CLARITY & CERTAINTY', value: 70, color: '#AA96DA' },
      { name: 'BEING CONNECTED', value: 85, color: '#4ECDC4' },
      { name: 'SAFETY & COMFORT', value: 20, color: '#FF6B6B' },
      { name: 'PURPOSE', value: 50, color: '#FCBAD3' },
    ],
  },
  'Engineering': {
    overallVibe: 'Good',
    vibeScore: 35,
    participation: 72,
    monthlyActiveUsers: 88,
    kpiData: [
      { label: 'Excitement & Energy', value: 65, color: '#FF6B6B' },
      { label: 'Being connected', value: 75, color: '#4ECDC4' },
      { label: 'Learning & Growth', value: 80, color: '#FFE66D' },
      { label: 'Safety & Comfort', value: 70, color: '#FF6B6B' },
    ],
    factorData: [
      { name: 'EXCITEMENT & ENERGY', value: 65, color: '#FF6B6B' },
      { name: 'LEARNING & GROWTH', value: 80, color: '#FFE66D' },
      { name: 'AUTONOMY & INDEPENDENCE', value: 78, color: '#95E1D3' },
      { name: 'VALUED', value: 82, color: '#F38181' },
      { name: 'CLARITY & CERTAINTY', value: 75, color: '#AA96DA' },
      { name: 'BEING CONNECTED', value: 75, color: '#4ECDC4' },
      { name: 'SAFETY & COMFORT', value: 70, color: '#FF6B6B' },
      { name: 'PURPOSE', value: 76, color: '#FCBAD3' },
    ],
  },
  'Marketing': {
    overallVibe: 'Average',
    vibeScore: 8,
    participation: 68,
    monthlyActiveUsers: 82,
    kpiData: [
      { label: 'Excitement & Energy', value: 45, color: '#FF6B6B' },
      { label: 'Being connected', value: 62, color: '#4ECDC4' },
      { label: 'Learning & Growth', value: 55, color: '#FFE66D' },
      { label: 'Safety & Comfort', value: 48, color: '#FF6B6B' },
    ],
    factorData: [
      { name: 'EXCITEMENT & ENERGY', value: 45, color: '#FF6B6B' },
      { name: 'LEARNING & GROWTH', value: 55, color: '#FFE66D' },
      { name: 'AUTONOMY & INDEPENDENCE', value: 52, color: '#95E1D3' },
      { name: 'VALUED', value: 58, color: '#F38181' },
      { name: 'CLARITY & CERTAINTY', value: 60, color: '#AA96DA' },
      { name: 'BEING CONNECTED', value: 62, color: '#4ECDC4' },
      { name: 'SAFETY & COMFORT', value: 48, color: '#FF6B6B' },
      { name: 'PURPOSE', value: 54, color: '#FCBAD3' },
    ],
  },
};
