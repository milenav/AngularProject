import { Component, OnInit, EventEmitter, Output, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, DoCheck {
  isAuth: boolean;
  username: string = '';

  @Output() sidenavClose = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    
  }

ngDoCheck() {
  this.isAuth = this.authService.isAuthenticated();
  this.username = localStorage.getItem('username');
}  

  onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  logout() {
    this.authService.logout()
    .subscribe(() => {
      localStorage.clear();
      this.router.navigate([ '/login'])
    })
  }

}
