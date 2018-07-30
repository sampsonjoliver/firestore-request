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
      .onCreate(async (snapshot, context) => {
        const requestParams = new FirestoreRequestSnapshot<T>(
          snapshot.id,
          snapshot.createTime,
          snapshot.updateTime,
          snapshot.readTime,
          snapshot.data() as RequestData<T>
        );

        try {
          const result = await handler(requestParams, context);

          await snapshot.ref.set({ status: 'complete' }, { merge: true });

          return result;
        } catch (e) {
          await snapshot.ref.set({ status: 'failed' }, { merge: true });
          throw e;
        }
      });
  }
}
