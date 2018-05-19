import { RequestBuilder } from '../src/models/RequestBuilder';
import * as functions from 'firebase-functions';

const mockOnCreate = jest.fn();
jest.mock('firebase-functions', () => ({
  firestore: {
    document: jest.fn().mockImplementation(() => ({
      onCreate: mockOnCreate
    }))
  }
}));
const mockDocument = functions.firestore.document;

describe('RequestBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('onRequest', () => {
    const instance = new RequestBuilder('type');

    const handler = jest.fn();

    instance.onRequest(handler);

    expect(mockDocument).toHaveBeenCalled();
    expect(mockOnCreate).toHaveBeenCalled();
  });

  it('onRequest watches correct document', () => {
    const instance = new RequestBuilder('type');

    const handler = jest.fn();
    instance.onRequest(handler);

    expect(mockDocument).toHaveBeenCalled();
    expect(mockDocument).toHaveBeenCalledWith('requests/root/type/{requestId}');
  });
});
