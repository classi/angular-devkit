import { EventTrack, UserContext, UserTimingTrack } from '../types';

export abstract class TrackingEngine {
  abstract setUserContext(user: UserContext): void;
  abstract clearUserContext(): void;
  abstract sendPageView(url: string): void;
  abstract sendEvent(event: EventTrack): void;
  abstract sendUserTiming(userTiming: UserTimingTrack): void;
  abstract setCustomDimensions(dimensions: Record<string, string>): void;
}
