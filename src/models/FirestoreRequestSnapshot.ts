import { RequestData } from '.';

export class FirestoreRequestSnapshot<T> {
  public id: string;
  public createTime?: string;
  public updateTime?: string;
  public readTime: string;
  private _data: () => RequestData<T>;

  data(): RequestData<T> {
    return this._data();
  }

  constructor(
    id: string,
    createTime: string | undefined,
    updateTime: string | undefined,
    readTime: string,
    data: () => RequestData<T>
  ) {
    this.id = id;
    this.createTime = createTime;
    this.updateTime = updateTime;
    this.readTime = readTime;
    this._data = data;
  }
}
