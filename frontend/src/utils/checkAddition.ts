import { EUrlKeys, ICarQueryParams } from "../http/carAPI";

export const checkAddition = (key: EUrlKeys, { urlSearchParams, result }: { urlSearchParams: URLSearchParams, result: ICarQueryParams }) => {
  if (urlSearchParams.has(key)) {
    if (
      urlSearchParams.get(key)?.length &&
      urlSearchParams.get(key)!.length !== 0
    ) {
      result[key] = urlSearchParams.get(key)!;
    }
  }
}