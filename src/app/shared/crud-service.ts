import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs";

export class CrudService<T> {

  constructor(protected _http: HttpClient, private URL_API: any) { }

  list() {
    return this._http.get<T[]>(this.URL_API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadById(id: any) {
    return this._http.get<T>(`${this.URL_API}/${id}`).pipe(take(1));
  }

  private create(record: any) {
    return this._http.post(this.URL_API, record).pipe(take(1));
  }

  private update(record: any) {
    return this._http.put(`${this.URL_API}/${(record.id)}`, record).pipe(take(1));
  }

  delete(id: any) {
    return this._http.delete(`${this.URL_API}/${id}`).pipe(take(1));
  }

  save(record: any) {
    if (record.id) {
      return this.update(record);
    }

    return this.create(record);
  }

}
