import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';

import { NgProgressService } from 'ng2-progressbar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {

  constructor(
    private process: NgProgressService,
    private title: Title
  ) { }

  ngOnInit() {
    //this.process.start();
    this.title.setTitle('About');
  }
  ngAfterViewInit() {
    // start process-bar
    this.process.start();
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }
  ngAfterViewChecked() {
    // done process-bar
    this.process.done();
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.

  }


}
