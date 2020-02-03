import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { endpoints } from '../../environments/endpoints';
@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private httpClient: HttpClient) { }

  private readonly basePath: string = '/uiadmin/api/v1';

  getEnvironments() {
    return this.httpClient.get(`${endpoints.environments}${this.basePath}/environment`);
  }

  getEnvironmentConfig(id: string) {
    return this.httpClient.get(`${endpoints.environments}${this.basePath}/environment/config/${id}`);
  }

  startEnvironmentServer(id: string, serverName: string) {
    return this.httpClient
      .post(`${endpoints.environments}${this.basePath}/environment/server/start/${id}/${serverName}`, {});
  }

  stopEnvironmentServer(id: string, serverName: string) {
    return this.httpClient
      .post(`${endpoints.environments}${this.basePath}/environment/server/stop/${id}/${serverName}`, {});
  }

  restartEnvironmentServer(id: string, serverName: string) {
    return this.httpClient
      .post(`${endpoints.environments}${this.basePath}/environment/server/restart/${id}/${serverName}`, {});
  }

  listServerContent(id: string, serverName: string) {
    return this.httpClient
      .get(`${endpoints.environments}${this.basePath}/environment/server/content/${id}/${serverName}`);
  }

  stopApi(id: string, apiName: string, type: string, serverName: string) {
    return this.httpClient
      .post(`${endpoints.environments}${this.basePath}/environment/server/api/stop/${id}/${serverName}/${apiName}/${type}`, {});
  }

  startApi(id: string, apiName: string, type: string, serverName: string) {
    return this.httpClient
      .post(`${endpoints.environments}${this.basePath}/environment/server/api/start/${id}/${serverName}/${apiName}/${type}`, {});
  }

  deleteApi(id: string, apiName: string, type: string, serverName: string) {
    return this.httpClient
      .delete(`${endpoints.environments}${this.basePath}/environment/server/api/delete/${id}/${serverName}/${apiName}/${type}`, {});
  }

  listUsers() {
    return this.httpClient
      .get(`${endpoints.environments}${this.basePath}/user`);
  }

  createServer(id, serverName, debugPort, mqName) {
    const data = {
      id,
      serverName,
      debugPort,
      mqName
    }
    return this.httpClient
      .post(`${endpoints.environments}${this.basePath}/environment/server/`, data);
  }

  deleteServer(id, serverName) {
    return this.httpClient
      .delete(`${endpoints.environments}${this.basePath}/environment/server/delete/${id}/${serverName}`);
  }

  createEnvironment(name, basePath) {
    const data = {
      environment: {
        name,
        basePath
      }
    }
    return this.httpClient
      .post(`${endpoints.environments}${this.basePath}/environment`, data);
  }

  updateEnvironment(id, envName, basePath) {
    const data = {
      id,
      envName,
      basePath
    }

    console.log(data)

    return this.httpClient
      .patch(`${endpoints.environments}${this.basePath}/environment`, data);
  }

  findEnvironmentById(id) {
    return this.httpClient
      .get(`${endpoints.environments}${this.basePath}/environment/${id}`);
  }

  deleteEnvironment(id) {
    return this.httpClient
      .delete(`${endpoints.environments}${this.basePath}/environment/${id}`);    
  }

}
