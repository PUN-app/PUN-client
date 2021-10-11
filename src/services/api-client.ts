import Axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

export abstract class ApiClient {
  protected ccConfig = {
    schema: "http",
    host: "localhost",
    port: "80",
  };

  private apiHostUrl: string | undefined;

  public get baseApiHostUrl() {
    let url = this.apiHostUrl;
    if (!url)
      url = "{schema}://{host}:{port}"
        .replace("{schema}", this.ccConfig.schema)
        .replace("{host}", this.ccConfig.host)
        .replace("{port}", this.ccConfig.port);
    return url;
  }
  public set baseApiHostUrl(url: string) {
    this.apiHostUrl = url;
  }

  protected abstract get baseUrl(): string;

  protected _axios!: AxiosInstance;
  protected get axios(): AxiosInstance {
    if (!this._axios)
      this._axios = Axios.create({
        baseURL: this.baseUrl,
      });
    return this._axios;
  }

  constructor() {
  }

  toServiceError(err: any): ServiceError {
    if (err.response) {
      const error = new ServiceError(err.response.status);
      error.status = err.response.status;
      if (err.response.data) {
        if (err.response.data.message)
          error.message = err.response.data.message;
        else
          console.log(
            "testAxios err response: " + JSON.stringify(err.response)
          );
        if (err.response.data.reason) error.reason = err.response.data.reason;
      }
      console.log("testAxios err status: " + err.response.status);
      console.log("testAxios err: " + err);
      console.log("testAxios err: " + JSON.stringify(err));
      //TODO Put response details in error
      return error;
    } else if (err.message) {
      console.warn("Unexpected error: " + JSON.stringify(err));
      return new ServiceError(err.message);
    } else {
      console.warn("Unexpected error: " + JSON.stringify(err));
      return new ServiceError("Unexpected error");
    }
  }

  printResponse(methodName: string, result: AxiosResponse) {
    console.log(`${methodName} we have a result`);
    const keys = Object.keys(result);
    // status,statusText,headers,config,request,data
    console.log(`${methodName} keys: ` + keys);
    console.log(`${methodName} status: ${result.status} ${result.statusText}`);
    console.log(
      `${methodName} headers: ` + JSON.stringify(result.headers, null, 2)
    );
    console.log(
      `${methodName} config: ` + JSON.stringify(result.config, null, 2)
    );
    console.log(`${methodName} data: ` + JSON.stringify(result.data, null, 2));
  }
}

export interface ServiceResponse {
  status: number;
  result: string;
  message: string;
  data: any;
  count: number;
  args: any;
}

export class ServiceError implements ServiceResponse {
  public status = 0;
  public result = "error";
  public data = null;
  public count = 0;
  public args = null;
  public reason?: string;

  constructor(public message: string) {}
}
