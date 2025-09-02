import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaxRecordService {
  private apiUrl = 'http://localhost:5277/api/taxrecords';

  constructor(private http: HttpClient) { }

  getTaxRecords(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTaxRecord(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createTaxRecord(record: any): Observable<any> {
    return this.http.post(this.apiUrl, record);
  }

  updateTaxRecord(id: number, record: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, record);
  }

  deleteTaxRecord(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
