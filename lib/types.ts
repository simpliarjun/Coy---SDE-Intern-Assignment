export type SwipeDirection = "like" | "pass";

export interface ProfilePrompt {
  q: string;
  a: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  college: string;
  major: string;
  bio: string;
  avatar: string;
  prompts: ProfilePrompt[];
  interests: string[];
}

export type PublicProfile = Profile;

export interface MatchedProfile extends Profile {
  matchedAt: number | string;
}

export type MatchRecord = MatchedProfile;

export interface SwipeRequest {
  targetId: string;
  direction: SwipeDirection;
}

export interface SwipeResultNonMatch {
  matched: false;
  match?: never;
}

export interface SwipeResultMatch {
  matched: true;
  match: MatchedProfile;
}

export type SwipeResult = SwipeResultNonMatch | SwipeResultMatch;

export type SwipeResponse = SwipeResult;

export interface FeedResponse {
  profiles: PublicProfile[];
}

export interface MatchesResponse {
  matches: PublicProfile[];
}
