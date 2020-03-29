import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Season, SeasonRes } from '@models/season';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private http: HttpClient) { }

  getSeasonById(id: number): Observable<Season> {
    return this.http.get<{ season: SeasonRes }>(`/seasons/${id}`)
      .pipe(map(res => new Season(res.season)))
  }

  getSeasonByKey(key: string): Observable<Season> {
    // FIXME: Replace by '/seasons?key=<key>' when available
    return this.http.get<{ seasons: SeasonRes[] }>('/seasons')
      .pipe(map(res => {
        return new Season(res.seasons.find(season => season.key === key))
      }))
  }
}
