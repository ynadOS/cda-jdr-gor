import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NpcService {
  private apiUrl = 'http://localhost:3000/npc';

  constructor(private http: HttpClient) {}

  createNpc(npc: any): Observable<any> {
    return this.http.post(this.apiUrl, npc);
  }

  updateNpc(npc: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${npc.id}`, npc);
  }

  deleteNpc(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAllNpcs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getNpcById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getNpcsByCampaign(campaignId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?campaignId=${campaignId}`);
  }
}
