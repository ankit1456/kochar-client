import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  public signinForm!: FormGroup;
  constructor(
    private FormBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = this.FormBuilder.group({
      email: [''],
      password: [''],
    });
  }
  signin() {
    this.http
      .post<any>(
        'https://kochar-server.herokuapp.com/api/v1/users/signin',
        this.signinForm.value
      )
      .subscribe(
        (res) => {
          alert('Logged in Successfully 😁');
          this.signinForm.reset();
          if (res.data.user) this.router.navigate(['dashboard']);
        },
        (err) => {
          alert('Something went wrong! Please try again' + err.message);
        }
      );
  }
}
