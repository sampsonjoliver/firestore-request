export interface RequestData<T = any> {
  requestType: string;
  payload: T;
}

export { FirestoreRequestSnapshot } from './FirestoreRequestSnapshot';
