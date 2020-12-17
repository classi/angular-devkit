export type PageTrack = {
  url: string;
};

export type EventBaseParams = Gtag.ControlParams &
  Gtag.CustomParams & {
    event_category?: string;
    event_label?: string;
    value?: number;
  };

export type EventTrack = PredefinedEventTrack | CustomEventTrack;
export type PredefinedEventTrack = {
  name: Gtag.EventNames;
  params?: EventBaseParams & Gtag.EventParams;
};
export type CustomEventTrack = {
  name: string;
  params?: EventBaseParams;
};

export type UserTimingTrack = {
  name: string;
  params: EventBaseParams & {
    value: number;
  };
};

export type UserContext = {
  id: string;
};
