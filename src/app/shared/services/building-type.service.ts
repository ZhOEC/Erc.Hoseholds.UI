import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { BuildingType } from '../models/building-type'

@Injectable()
export class BuildingTypeService {
  private apiUrl = `${environment.apiServer}buildingtypes/`

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<BuildingType[]>(this.apiUrl)
  }
}
