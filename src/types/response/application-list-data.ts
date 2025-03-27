export interface ApplicationListData<T> {
  data: T[];
  cursorPagination: ApplicationPaginateData;
  withCount: ApplicationWithCountData;
}

export interface ApplicationPaginateData {
  nextCursor: string | null;
  prevCursor: string | null;
}

export interface ApplicationWithCountData {
  valid: boolean;
  count: number;
}
