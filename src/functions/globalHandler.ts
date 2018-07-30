import * as functions from 'firebase-functions';

import { FirestoreRequestSnapshot } from '../models/FirestoreRequestSnapshot';
import { RequestData } from '../models';

type Handler = (
  params: FirestoreRequestSnapshot<any>,
  context?: functions.EventContext
) => PromiseLike<any> | any;

class UnsupportedRequestError extends Error {}
class UnknownRequestTypeError extends Error {}

const registeredHandlers: Map<string, Handler> = new Map();

const globalRequestHandler = functions.firestore
  .document(`requests/{requestId}`)
  .onCreate((snapshot, context) => {
    const requestType = (snapshot.data() || {}).requestType;

    if (!requestType) {
      throw new UnknownRequestTypeError(
        `No requestType found for request ${JSON.stringify(snapshot.data())}`
      );
    }

    const handler = registeredHandlers.get(requestType);
    if (!handler) {
      throw new UnsupportedRequestError(
        `Request type ${requestType} has no registered handler`
      );
    }

    const requestParams = new FirestoreRequestSnapshot(
      snapshot.id,
      snapshot.createTime,
      snapshot.updateTime,
      snapshot.readTime,
      snapshot.data() as RequestData<any>
    );

    return handler(requestParams, context);
  });

export { globalRequestHandler };
