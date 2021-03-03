export class LoggingService {
  public logStatusChange(status: string) {
    console.log(`A server status changed, new status: ${status}`);
  }
}
