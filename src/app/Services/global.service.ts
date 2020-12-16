import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Login } from '../pages/home/login-model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  onHttpLogin = new Subject(); // observables
  isLogged = new Subject();
  onHttpGetProfile = new Subject();
  onHttpUpdateProfile = new Subject();

  constructor(private http: HttpClient) {

  }

  httpLogin(logins : Login){
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/auth/login';

    const data = {
      username: logins.username,
      password: logins.password
    };

    this.http.post(url,data).subscribe((data : any) => {
      console.log(data)
      if(data.status === 'success' ){
        this.onHttpLogin.next(data.data);
      }
    },
    (error) => {
      console.log(error)
    }
    );
  }

  httpUpdateProfile(data: any): void{
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.put(url, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe((response: any) => {
      console.log('update',response);
      if(response.status === 'success'){
        this.onHttpUpdateProfile.next(response.data);
      }
    },
    (error) =>{
      console.log('error response from htppUpdateProfile', error)
    }
    );
  }

  httpGetProfile(): void{
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    console.log(token);

    this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe(
      (response:any) => {

      if(response.status === 'success'){
        console.log('this is from htppGetProfile', response)
        this.onHttpGetProfile.next(response.data);
      }
    },
      (error) =>{
        console.log('error response from htppGetProfile', error)
      }
    );


  }

  setToken(token: string): void {
    localStorage.setItem('token',token);
    this.isLogged.next(true);
  }

  getToken(): string{
    return localStorage.getItem('token');
  }

  checkLogStatus(): void{
    const token = localStorage.getItem('token');

    if(token){
      this.isLogged.next(true);
    }
    else{
      this.isLogged.next(false);
    }
  }

  deleteToken(): void{
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }

}
