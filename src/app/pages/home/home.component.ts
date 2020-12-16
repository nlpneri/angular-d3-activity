import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Services/global.service';
import { Login } from './login-model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged: any;
  login: Login = {
    username: '',
    password: ''
  };

  constructor(private service: GlobalService, private router: Router) {
    this.isLogged = false;
  }

  ngOnInit(): void {

    this.service.checkLogStatus();
    this.service.isLogged.subscribe((logged:any) => {
      this.isLogged = logged;
    });

  }

  onLogin() : void {
    this.service.httpLogin(this.login);

    this.service.onHttpLogin.subscribe((response: any) => {
      const token = response.token;

      this.service.setToken(token);
      console.log(token);
      setTimeout(()=>{
        this.router.navigate(['/my-profile']);
      }, 10)
    });
  };

  onLogOut() : void{
    this.service.deleteToken();
  }

}
