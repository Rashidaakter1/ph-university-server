export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
