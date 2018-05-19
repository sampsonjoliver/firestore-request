import { request } from '../src/request';

const mockCollectionAdd = jest.fn();
const mockCollection = jest.fn().mockImplementation(() => ({
  add: mockCollectionAdd
}));
const mockFirestore = {
  collection: () => ({
    doc: () => ({
      collection: mockCollection
    })
  })
};

jest.mock('firebase', () => ({
  firestore: jest.fn().mockImplementation(() => mockFirestore)
}));

describe('request', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Calling request calls firestore add methods', () => {
    const requestData = { requestType: 'type' };
    request(requestData);

    expect(mockCollection).toHaveBeenCalled();
    expect(mockCollection).toHaveBeenCalledWith('type');
    expect(mockCollectionAdd).toHaveBeenCalled();
    expect(mockCollectionAdd).toHaveBeenCalledWith(requestData);
  });
});
