import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';

// Service
import { PokemonService } from './pokemon/pokemon.service';
import { NgProgressModule } from 'ng2-progressbar';
import { SharedService } from './ShareDataService/share-data.service';

// Component 
import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';



@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        HomeComponent,
        AboutComponent,
        PokemonComponent,
        PokemonDetailComponent
    ],
    imports: [
        NgProgressModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot([
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            { path: 'home', component: HomeComponent },
            {
                path: 'pokemon', children:
                    [
                        { path: ':id', component: PokemonDetailComponent },
                        { path: '', component: PokemonComponent },
                    ]
            },
            { path: 'pokemon/:id', component: PokemonDetailComponent },
            { path: 'about', component: AboutComponent },
        ])
    ],
    providers: [Title, PokemonService, SharedService],
    bootstrap: [AppComponent]
})
export class AppModule { }
