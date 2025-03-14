import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../model/LoginRequest';
import { User } from '../../model/User';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginError: string = '';
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  async login() {
    if (this.loginForm.valid) {
      this.loginError = '';
      this.loading = true;
      const { email, password } = this.loginForm.value as LoginRequest;

      try {
        const userData: User = await this.loginService.login(email, password);
        console.log('Usuario autenticado:', userData);
        this.router.navigateByUrl('/dashboard');
      } catch (error: any) {
        console.error(error);
        this.loginError = error.message;
      } finally {
        this.loading = false;
        this.loginForm.reset();
      }
    } else {
      this.loginForm.markAllAsTouched();
      alert('Error al ingresar los datos.');
    }
  }
}
