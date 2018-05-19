import * as app from '../src/app';

describe('app', () => {
  it('To have default value', () => {
    expect(app.globalParams.rootCollection).toEqual('requests');
  });

  it('Updates globals vars', () => {
    const newValue = 'mySuperDuperCollectionName';

    expect(app.globalParams.rootCollection).not.toBe(newValue);

    app.initialiseApp({ rootCollection: newValue });

    expect(app.globalParams.rootCollection).toBe(newValue);
  });
});
