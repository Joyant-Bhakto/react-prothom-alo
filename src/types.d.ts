import { store } from "@store/configureStore";
import { ProductStatus } from "@constants/product";
import rootReducer from "@store/reducers/rootReducer";
import { DeliveryCompany } from "@constants/delivery";

export type LoginMutationResponseType = {};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export type ServerNonFieldError = {
  code: number;
  message: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  to: number;
  from: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

export type ResourceCreatedResponse = {
  code: 201;
  message: string;
};

export type ResourceUpdatedResponse = {
  code: 200;
  message: string;
};

export type ResourceDeletedResponse = {
  code: 200;
  message: string;
};

export type ServerValidationError = {
  code: number;
  message: string;
  errors: Record<string, string[]>;
};

export type ServerErrorType = ServerValidationError | ServerNonFieldError;

type FilterOperators = "like" | "=" | "between";

// UnionToIntersection<A | B> = A & B
type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never;

// LastInUnion<A | B> = B
type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never;

// UnionToTuple<A, B> = [A, B]
type UnionToTuple<T, Last = LastInUnion<T>> = [T] extends [never]
  ? []
  : [Last, ...UnionToTuple<Exclude<T, Last>>];

type SearchFields<
  T extends {},
  K extends UnionToTuple<keyof T> = UnionToTuple<keyof T>,
  R extends `${keyof T}:${FilterOperators}`[] = [`${K[0]}:${FilterOperators}`]
> = K extends [infer Head, ...infer Tail]
  ? SearchFields<T, Tail, [`${Head}:${FilterOperators}`, ...R]>
  : R;

// your answers
type Join<T extends unknown[], U extends string | number> = T extends [
  infer First,
  ...infer Rest
]
  ? `${First & string}${Rest["length"] extends 0 ? "" : U}${Join<Rest, U>}`
  : "";

export type PaginationQueryParams<T extends {}> = {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: keyof T;
  sortedBy?: "asc" | "desc";
};

export interface User {}

export interface UserResponse {
  user: User;
  token: string;
}

export type JoteyQueryError = {
  status: number | "FETCH_ERROR" | "PARSING_ERROR" | "CUSTOM_ERROR";
  data: {
    non_field_error: string;
    field_errors: Record<string, string>;
  };
};

export type INews = {
  id: number;
  headline: string;
  subheadline: string;
  sort: string;
  thumb: string;
  "cover-photo": string;
  descriptions: string;
};

export type INewsListResponse = {
  data: {
    [key in "latest" | "mostread" | "discussed" | "selected"]: {
      name: "সর্বশেষ" | "পঠিত" | "আলোচিত" | "নির্বাচিত";
      items: INews[];
    };
  };
};
