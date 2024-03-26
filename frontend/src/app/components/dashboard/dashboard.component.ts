import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { MiscService } from 'src/app/services/misc.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    constructor(@Inject(DOCUMENT) public document: Document, private miscService: MiscService){}

    ngOnInit(): void {}
    
    renderMenu($event: any){
        this.miscService.renderMenu($event);
    }
}
