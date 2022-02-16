export interface IParams {}

export interface IResponse<T> {
  status: string;
  data: {
    [key: string]: T;
  };
}
