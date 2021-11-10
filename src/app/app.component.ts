import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./service/token-storage.service";
import {DataTransferService} from "./service/data-transfer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todoApp';
  isHome = true;

  isRegister=false;
  isLoggedIn = false;


  private roles: string[] = [];
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, private dataTransfer: DataTransferService, private router: Router) {
    this.dataTransfer.currentIsLoginStatus.subscribe(data => {
      console.log('logged in data', data);
      this.isLoggedIn = data;
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
    this.router.navigate(['/login']);
  }

}
