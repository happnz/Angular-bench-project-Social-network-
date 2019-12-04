export default class Friend {
  constructor(public id: number,
              public name: string,
              public lastName: string) {}

  get fullName() {
    return `${this.name} ${this.lastName}`;
  }
}
