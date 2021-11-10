import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    firstname: null,
    lastname: null,
    username: null,
    phone: null,
    email: null,
    password: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    localStorage.removeItem('currentUser');

  }

  onSubmit(): void {
    console.log('data 1 : ', this.form);
    this.authService.register(this.form).subscribe(
      data => {
        console.log('data here: ', data);
         //this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        console.log('error message', err.error.message);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  isNumberKey(event: any) {
    var charCode = (event.value) ? event.value : event.keyCode;
    return !(charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57));

  }
}
