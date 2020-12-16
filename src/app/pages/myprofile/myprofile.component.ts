import { AfterContentChecked, AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/Services/global.service';
import { Profile } from './myprofile-model';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  isLogged: boolean;
  profile: Profile = {
    email: '',
    firstName: '',
    lastName: '',
    alias: '',
    mobileNumber: '',
    jobTitle: '',
    password: ''
  }

  profileForm : any;

  constructor(private service: GlobalService,  private router: Router ) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.service.httpGetProfile();

    this.service.onHttpGetProfile.subscribe((profile) => {
      this.fillForms(profile);
      console.log(profile);
    });

    this.profileForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      alias: new FormControl('',[Validators.required]),
      jobTitle: new FormControl('',[Validators.required]),
      mobileNumber: new FormControl('',[Validators.required]),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });

    this.service.checkLogStatus();

    this.service.isLogged.subscribe((response: any) => {


          this.isLogged = response;
          console.log('QW',this.isLogged);

    });

  }

  fillForms(data : any): void{
    this.profileForm.patchValue({
      email: data.email,
      firstName: data.meta.first_name,
      lastName: data.meta.last_name,
      alias: data.alias,
      jobTitle: data.meta.job_title,
      mobileNumber: data.meta.mobile_number
    });
  }

  onSubmit() : void {
      if(this.profileForm.valid){
        const formValues = this.profileForm.value;
        const newFormValues = {
          meta: {
            first_name: formValues.firstName,
            last_name: formValues.lastName,
            job_title: formValues.jobTitle,
            timezone: 'Asia/Manila',
            mobile_number: formValues.mobileNumber
          },
          current_password: '',
          email: formValues.email,
          alias: formValues.alias
        }
        this.service.httpUpdateProfile(newFormValues);
      }
  }


  onLogOut() : void{
    this.service.deleteToken();
    this.router.navigate(['/']);
  }
}
