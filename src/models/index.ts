export interface RequestData<T = any> {
  requestType: string;
  status: 'pending' | 'success' | 'failed';
  payload: T;
}

export { FirestoreRequestSnapshot } from './FirestoreRequestSnapshot';
