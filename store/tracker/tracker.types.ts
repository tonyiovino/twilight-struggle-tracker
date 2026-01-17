export type RegionId = 'Europe' | 'Asia' | 'CA' | 'SA' | 'Africa' | 'ME';

export interface Region {
  name: string;
  points: {
    presence: number;
    domination: number;
    control: number;
  };
}

export enum Power {
  USA = 'USA',
  URSS = 'URSS',
}

export interface Country {
  name: string;
  adjacentTo?: Power;
  battleground: boolean;
  stability: number;
  blueInfluence: number;
  redInfluence: number;
  region: RegionId;
  subregion?: 'SEAsia';
  tempBattleground?: boolean;
}

export type Regions = Record<RegionId, Region>;

export type Countries = Country[];
