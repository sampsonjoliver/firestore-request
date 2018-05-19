import { FirestoreRequestSnapshot } from '../src/models/FirestoreRequestSnapshot';
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

describe('FirestoreRequestSnapshot', () => {
  it('Constructs', () => {
    const data = () => ({
      requestType: 'type'
    });

    const instance = new FirestoreRequestSnapshot(
      'id',
      'createTime',
      'updateTime',
      'readTime',
      data
    );

    expect(instance).toBeInstanceOf(FirestoreRequestSnapshot);

    expect(instance.id).toBe('id');
    expect(instance.createTime).toBe('createTime');
    expect(instance.updateTime).toBe('updateTime');
    expect(instance.readTime).toBe('readTime');
    expect(instance.data()).toEqual(data());
  });
});
