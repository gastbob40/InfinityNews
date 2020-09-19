import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiManagerService {
    private readonly serverEndpoint: string;

    constructor(protected http: HttpClient) {
        this.serverEndpoint = 'https://news-epita.gastbob40.ovh/api/';
    }

    public doRequest(url: string): Observable<any> {
        return this.http.get(`${this.serverEndpoint}${url}`);
    }

    public getGroups(): Observable<any> {
        return this.doRequest('groups/');
    }

    public getNews(group: string): Observable<any> {
        return this.doRequest('groups/' + group);
    }

    public getSpecificNews(group: string, newsId: any): Observable<any> {
        return this.doRequest(`groups/${group}/${newsId}`);
    }
}
