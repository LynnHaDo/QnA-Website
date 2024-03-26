import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor() { }

  renderMenu($event: any){
    let clickedEl = $event.target || $event.srcElement;
        if (clickedEl.nodeName === "A"){
            let otherActive = clickedEl.parentElement.parentElement.querySelector(".active")
            if (otherActive){
                otherActive.classList.remove("active")
            }
            clickedEl.parentElement.classList.add("active")
        }
  }
}
