import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: [''],
      email: [''],
      password: [''],
      passwordConfirm: [''],
    });
  }
  signup() {
    this.http
      .post<any>(
        'https://kochar-server.herokuapp.com/api/v1/users/signup',
        this.signupForm.value
      )
      .subscribe(
        (res) => {
          alert('Account Created Successfully 😁');
          this.signupForm.reset();
          if (res.data.user) this.router.navigate(['dashboard']);
        },
        (err) => {
          alert('Something went wrong! Please try again');
        }
      );
  }
}
