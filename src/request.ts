import { firestore } from 'firebase';
import { RequestData } from './models';
import { globalParams } from './app';

export function request(data: RequestData) {
  return firestore()
    .collection(globalParams.rootCollection)
    .doc('root')
    .collection(data.requestType)
    .add(data);
}
