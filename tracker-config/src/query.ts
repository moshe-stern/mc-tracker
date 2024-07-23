interface QueryOptions {
  select?: object
  limit?: number;
  page?: number;
  sortBy?: string;
  sortType?: 'asc' | 'desc';
}

export {
  QueryOptions
}