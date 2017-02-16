import { Pokemon } from './pokemon';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PokemonService {

    // private linkUrl = "http://58952d75c1770c12000657b1.mockapi.io/Pokemon/Pokemon/";
    private linkUrl = "http://58952d75c1770c12000657b1.mockapi.io/Pokemon/Pokemon/";
    constructor(
        private http: Http
    ) { }
    // get Pokemon
    getPokemon = (): Observable<Pokemon[]> => {
        return this.http.get(this.linkUrl)
            .map(response => {
                return response.json();
            })
            .catch(this.handleError)
    }
    // get Pokemon by id
    getPokemonById = (id: number): Observable<Pokemon> => {
        return this.http.get(this.linkUrl + id).map((response) => {
            return response.json();
        })
    }
    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
