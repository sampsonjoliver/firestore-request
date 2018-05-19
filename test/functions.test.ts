import * as functions from '../src/functions';
import { RequestBuilder } from '../src/models/RequestBuilder';

jest.mock('../src/models/RequestBuilder');

describe('functions', () => {
  it('Calling functions.request returns a request builder', () => {
    expect(functions.request('type')).toBeInstanceOf(RequestBuilder);
    expect(RequestBuilder).toHaveBeenCalledTimes(1);
    expect(RequestBuilder).toHaveBeenCalledWith('type');
  });
});
