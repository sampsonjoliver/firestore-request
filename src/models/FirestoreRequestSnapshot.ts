import { RequestData } from '.';

export class FirestoreRequestSnapshot<T> {
  public id: string;
  public createTime: string;
  public updateTime: string;
  public readTime: string;
  private _data: () => T & RequestData;

  data(): T {
    return this._data();
  }

  constructor(
    id: string,
    createTime: string,
    updateTime: string,
    readTime: string,
    data: () => T & RequestData
  ) {
    this.id = id;
    this.createTime = createTime;
    this.updateTime = updateTime;
    this.readTime = readTime;
    this._data = data;
  }
}
