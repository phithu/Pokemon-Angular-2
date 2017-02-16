import { AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';

import { NgProgressService } from 'ng2-progressbar';
import { Pokemon } from './pokemon';
import { PokemonService } from './pokemon.service';
import { Router } from '@angular/router';
import { SharedService } from './../ShareDataService/share-data.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnChanges, OnInit, AfterViewInit, AfterViewChecked {
    pokemons: Pokemon[];
    keyword: string;
    checkEmpty: boolean;

    constructor(
        private process: NgProgressService,
        private title: Title,
        private pokemonService: PokemonService,
        private shareService: SharedService,
        private router: Router

    ) { }

    ngOnInit() {
        // set title page
        this.title.setTitle('Pokemon');
        // callback getPokemons
        this.getPokemons();
        //Search
        this.Search();
    }
    ngAfterViewInit() {
        // start process
        this.process.start();
    }
    ngAfterViewChecked() {
        this.process.done();
    }
    ngOnChanges(changeRecord) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add 'implements OnChanges' to the class.

    }
    getPokemons() {
        this.pokemonService.getPokemon().subscribe((pokemon: Pokemon[]) => {
            this.pokemons = pokemon;
        })
    }
    Search() {
        this.pokemonService.getPokemon().subscribe((pokemon: Pokemon[]) => {
            let _pokemon = pokemon; //array pokemon temp
            this.pokemons = _pokemon;
            // get keyword from menu Component
            this.shareService.changeEmitted$.subscribe(text => {
                this.keyword = text;
                if (this.keyword) {
                    // filter by keyword
                    this.pokemons = _pokemon.filter(value => {
                        return value.name.toLowerCase().includes(this.keyword.toLowerCase());
                    })
                    // check length of pokemon (hiển thị lỗi không tìm kiếm đc)
                    if (this.pokemons.length === 0) {
                        this.checkEmpty = true;
                    }
                    else {
                        this.checkEmpty = false;
                    }
                }
                else {
                    this.pokemons = _pokemon;
                }
            });
        })
    }
    OnChange(event) {
        let typePokemon: string = event.target.value;
        this.pokemonService.getPokemon().subscribe(value => {
            let pokemonsFilter = value; // get Pokemons from service
            this.pokemons = pokemonsFilter;
            if (typePokemon) {
                this.pokemons = pokemonsFilter.filter(value => {
                    return value.type.toUpperCase().includes(typePokemon.toUpperCase());
                })
            }
            else {
                this.pokemons = pokemonsFilter;
            }
        })
    }
}
