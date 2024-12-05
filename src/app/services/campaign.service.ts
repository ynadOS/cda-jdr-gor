import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = 'http://localhost:3000/campaigns'; // URL de l'API JSON Server

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer toutes les campagnes
  getCampaigns(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Méthode pour récupérer une campagne par ID
  getCampaignById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour ajouter une nouvelle campagne
  addCampaign(campaign: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, campaign);
  }

  // Méthode pour mettre à jour une campagne existante
  updateCampaign(id: number, campaign: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, campaign);
  }

  // Méthode pour supprimer une campagne
  deleteCampaign(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
