import { RequestData } from '.';

export class FirestoreRequestSnapshot<T> {
  public id: string;
  public createTime?: string;
  public updateTime?: string;
  public readTime: string;
  public data: RequestData<T>;

  constructor(
    id: string,
    createTime: string | undefined,
    updateTime: string | undefined,
    readTime: string,
    data: RequestData<T>
  ) {
    this.id = id;
    this.createTime = createTime;
    this.updateTime = updateTime;
    this.readTime = readTime;
    this.data = data;
  }
}
