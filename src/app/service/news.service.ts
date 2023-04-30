import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Source } from '../models/source.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  API_KEY = "34cdc4dda89b4adda1fdd6d74c230f41"

  constructor(private http: HttpClient) { }

  initSources() {
    return this.http.get(`https://newsapi.org/v2/sources?language=en&apiKey=${this.API_KEY}`)
  }

  getArticlesById(srcId: string) {
    return this.http.get(`https://newsapi.org/v2/top-headlines?sources=${srcId}&apiKey=${this.API_KEY}`)
  }

  initArticles() {
    return this.http.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`)
  }


}
