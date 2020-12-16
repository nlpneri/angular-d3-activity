import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../Services/global.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged : boolean;
  backToHome: boolean;

  constructor(private services: GlobalService) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.services.isLogged.subscribe((response: any) => {
      this.isLogged = response;
    });
  }

}
