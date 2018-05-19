import { RequestBuilder } from './models/RequestBuilder';

export function request(requestType: string) {
  return new RequestBuilder(requestType);
}
