export abstract class AnalyticsTrackerConfig {
  abstract disableTracking?: boolean;
}

export const defaultConfig: Partial<AnalyticsTrackerConfig> = {
  disableTracking: false,
};
