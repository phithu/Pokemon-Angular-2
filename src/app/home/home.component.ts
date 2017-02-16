import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';

import { NgProgressService } from 'ng2-progressbar';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

    constructor(
        private process: NgProgressService,
        private title: Title
    ) { }

    ngOnInit() {
        this.title.setTitle('Home');
        //this.process.start();
    }
    ngAfterViewInit() {
        // start process-bar
        this.process.start();
    }
    ngAfterViewChecked() {
        // done process-bar
        this.process.done();
        //Called after every check of the component's view. Applies to components only.
        //Add 'implements AfterViewChecked' to the class.

    }

}
