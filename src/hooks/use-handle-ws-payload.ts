import { WsEventRawPayload } from "@/types/ws/event";
import { WsEventType } from "@/types/ws/event-type";
import { convertKeysToCamelCase } from "@/utils/change-case";
import { useCallback } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useHandleWsPayload(
    handleData: (eventType :WsEventType, data :WsEventRawPayload) => void
): (payload: any) => void {
  return useCallback((msg) => {
    const content = convertKeysToCamelCase(JSON.parse(msg as string));
    const jsonPayload = content as WsEventRawPayload;
    handleData(jsonPayload.eventType, jsonPayload);
  }, [handleData]);
}