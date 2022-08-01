import { injectable } from "inversify";

@injectable()
export class ConfigService {
  public get apiBaseURL(): string {
    return "http://localhost:3000";
  }

  public get mediaBaseUrl(): string {
    return process.env.REACT_APP_MEDIA_BASE_URL ?? "";
  }

  public get exportBaseUrl(): string {
    return process.env.REACT_APP_EXPORT_BASE_URL ?? "";
  }

  public get contentType(): string {
    return "application/json";
  }

  public get accept(): string {
    return "application/json";
  }
}
