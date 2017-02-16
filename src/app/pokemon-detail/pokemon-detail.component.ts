import { ActivatedRoute, Params, Router } from '@angular/router';
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';

import { NgProgressService } from 'ng2-progressbar';
import { Pokemon } from './../pokemon/pokemon';
import { PokemonService } from './../pokemon/pokemon.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-pokemon-detail',
    templateUrl: './pokemon-detail.component.html',
    styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit, AfterViewInit {

    id: number;
    pokemon: Pokemon;

    constructor(
        private pokemonserive: PokemonService,
        private ngprocessserive: NgProgressService,
        private title: Title,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    // life cycle hook
    ngOnInit() {
        //this.ngprocessserive.start();
        this.getParamsId();
        this.getPokemonByID();

    }
    // life cycle hook
    ngAfterViewInit() {
        // start process-bar
         this.ngprocessserive.start();
    }
    ngAfterViewChecked() {
        // done process-bar
        this.ngprocessserive.done();        
    }
    // get pokemon by id
    getPokemonByID() {
        this.pokemonserive.getPokemonById(this.id).subscribe((pokemon: Pokemon) => {
            this.pokemon = pokemon;
        })
    }
    // get id
    getParamsId() {
        this.activatedRoute.params.subscribe((params: Params) => {
            let params_id = params['id'];
            this.id = params_id;
        })
    }
    // Back to pokemon component
    Back = () => {
        this.router.navigate(['pokemon']);
    }


}
