import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { NavigationService } from './navigation.service';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  type = 'type';
  showTitle = true;
  show = false;
  islogged = this.authService.isAuthenticated;
  opened: boolean;
  public media: string;
  switch = false;
  @ViewChild('snav') sideNav: MatSidenav;
  constructor(
    public _media$: ObservableMedia,
    public authService: AuthService,
    public router: Router,
    public navigationService: NavigationService,
    public themeService: ThemeService
  ) { }

  ngOnInit() {
    this.sideNav.close();
    this._media$.asObservable().subscribe((m: MediaChange) => {
      this.media = m.mqAlias;
    });
  }
  onResize(event) {
    if (this.media === 'xs' || this.media === 'sm') {
      this.showTitle = false;
      this.sideNav.close();
    } else { this.showTitle = true; }
  }
  change () {
    this.themeService.changeTheme();
  }
}
