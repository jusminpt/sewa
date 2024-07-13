import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../common-classes/country';
import { map } from 'rxjs/operators'
import { State } from '../common-classes/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private country_url = "https://sewa-app-1e033ac12cb0.herokuapp.com/api/countries";
  private state_url = "https://sewa-app-1e033ac12cb0.herokuapp.com/api/states";

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseContries>(this.country_url).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(country_code: string): Observable<State[]> {
    const search_state_url = `${this.state_url}/search/queryByCountryCode?code=${country_code}`;

    return this.httpClient.get<GetResponseStates>(search_state_url).pipe(
      map(response => response._embedded.states)
    );
  }

  getCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }

    return of(data);
  }

  getCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear = new Date().getFullYear();
    const endYear = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }

    return of(data);
  }
}
interface GetResponseContries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
