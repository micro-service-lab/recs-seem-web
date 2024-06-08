export const WsRequestTypes = {
  ONLINE_MEMBERS: "online_members",
} as const;

export type WsRequestType =
  (typeof WsRequestTypes)[keyof typeof WsRequestTypes];

export type WsRequest<T> = {
  requestType: WsRequestType;
  data: T;
};

export type WsEmptyDataRequest = WsRequest<Record<string, never>>;
