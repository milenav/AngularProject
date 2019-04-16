import { Component, OnInit, EventEmitter, Output, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  isAuth: boolean;

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    
  }

  ngDoCheck() {
    this.isAuth = this.authService.isAuthenticated();
  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout()
    .subscribe(() => {
      localStorage.clear();
      this.router.navigate([ '/login'])
    })
  }

}
