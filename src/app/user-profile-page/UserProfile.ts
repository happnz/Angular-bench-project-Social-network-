import Friend from './Friend';

export default class UserProfile {
  constructor(
  public id: number,
  public name: string,
  public lastName: string,
  public friends?: Friend[],
  public posts?: any[],
  public friendRequests?: Friend[]) {}

  get fullName() {
    return `${this.name} ${this.lastName}`;
  }
}
