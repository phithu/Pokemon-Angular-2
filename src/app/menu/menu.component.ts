import { NavigationStart, ActivatedRoute, Router } from '@angular/router';
import { SharedService } from './../ShareDataService/share-data.service';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    searchForm: FormGroup;
    searchInput: AbstractControl;
    keyword: string; // day la bien cần gửi giá trị
    urlCurrent: string;
    toogleShowForm = false;

    constructor(
        private formbuilder: FormBuilder,
        private shareService: SharedService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        // setup form
        this.SetUpForm();
        // Send data
        this.SendData();
        this.getUrl();
    }
    SetUpForm() {
        this.searchForm = this.formbuilder.group({
            searchInput: []
        });
        this.searchInput = this.searchForm.controls['searchInput'];
    }
    // dùng để hiển thị searchbox khi component là pokemon
    getUrl() {
        this.router.events.subscribe(urlCurrent => {
            this.urlCurrent = urlCurrent.url; // get url
            if (this.urlCurrent === '/pokemon') {
                this.toogleShowForm = true;
            }
            else {
                this.toogleShowForm = false;
            }
        })
    }
    SendData() {
        this.searchForm.controls['searchInput'].valueChanges.subscribe(value => {
            if (value) {
                this.shareService.emitChange(this.keyword);
            }
            else {
                this.shareService.emitChange(null);
            }

        })
    }



}
