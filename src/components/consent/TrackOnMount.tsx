"use client";

import { useEffect } from "react";
import { track, type EventName, type EventParams } from "@/lib/analytics/track";

/** Trimite un eveniment la afișarea paginii (ex. service_view). */
export function TrackOnMount({ event, params }: { event: EventName; params?: EventParams }) {
  const key = JSON.stringify(params ?? {});
  useEffect(() => {
    track(event, JSON.parse(key) as EventParams);
  }, [event, key]);
  return null;
}
