import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../authentication/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

  search(query) {
    this.router.navigate([`article/search`], {queryParams: {search: query.search}});
  }
}
