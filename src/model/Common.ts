export interface IParams {}

export interface IResponse<T> {
  status: string;
  data: {
    [key: string]: T;
  };
}

export interface IDictionary<T> {
  [index: string]: T;
}
