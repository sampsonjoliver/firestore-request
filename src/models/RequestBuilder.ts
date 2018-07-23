import * as functions from 'firebase-functions';

import { RequestData, FirestoreRequestSnapshot } from '.';
import { globalParams } from '../app';

export class RequestBuilder {
  private triggerResource: string;

  constructor(triggerResource: string) {
    this.triggerResource = triggerResource;
  }

  onRequest<T = any>(
    handler: (
      params: FirestoreRequestSnapshot<T>,
      context?: functions.EventContext
    ) => PromiseLike<any> | any
  ): functions.CloudFunction<any> {
    return functions.firestore
      .document(
        `${globalParams.rootCollection}/root/${
          this.triggerResource
        }/{requestId}`
      )
      .onCreate((snapshot, context) => {
        const requestParams = new FirestoreRequestSnapshot<T>(
          snapshot.id,
          snapshot.createTime,
          snapshot.updateTime,
          snapshot.readTime,
          snapshot.data as () => RequestData<T>
        );

        return handler(requestParams, context);
      });
  }
}
