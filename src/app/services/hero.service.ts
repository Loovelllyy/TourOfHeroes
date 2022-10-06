import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Hero} from "../hero";
import {catchError, Observable, of, tap} from "rxjs";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor( private messageService: MessageService, private http: HttpClient) { }

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: Error): Observable<T> => {
			console.error(error);

			this.log(`${operation} failed: ${error.message}`);

			return of(result as T)
		}
	}

	log(msg: string): void {
		this.messageService.add(msg);
	}

	getHeroes(): Observable<Hero[]> {
		this.log('HeroService: fetched heroes');
		return this.http.get<Hero[]>("https://jsonplaceholder.typicode.com/users")
			.pipe(
				tap(_ => this.log('fetched heroes')),
				catchError(this.handleError<Hero[]>('getHeroes', []))
			);
	}

	getHero(id: number): Observable<Hero> {
		this.messageService.add(`HeroService: fetched hero id=${id}`);
		return this.http.get<Hero>(`https://jsonplaceholder.typicode.com/users/${id}`);
	}
}
