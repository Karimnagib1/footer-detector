import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface pdfCheckResponse {
  y_ratio: number;
}
@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private apiUrl = "http://localhost:8000/"
  constructor(
    private http:HttpClient
  ) {
    
   }

   postCheckPdf(pdf: File): Observable<pdfCheckResponse>{
    const formData = new FormData();
    formData.append('pdf_file', pdf);
  
    return this.http.post<pdfCheckResponse>(this.apiUrl, formData)
   }
}
