export default class LoadingStatus {
  private loading = false;
  private loaded = false;
  private error: any;

  startLoading() {
    this.loading = true;
  }

  finishLoading(err?: any) {
    this.loading = false;
    this.loaded = true;
    if (err) {
      this.error = err;
    }
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  isLoading(): boolean {
    return this.loading;
  }

  getError(): any {
    return this.error;
  }
}
