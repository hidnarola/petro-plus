import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  visibleSidebar1;

  constructor() { }

  ngOnInit(): void {
  }

  navigationClick() {
    const getClass = document.getElementById('navbarIcon').classList.value;
    console.log('getClass => ', getClass);
    if (getClass === 'NavigationBody') {
      console.log('matched => ');
      document.getElementById('navbarIcon').classList.remove('NavigationBody');
      document.getElementById('navbarIcon').classList.add('OpenNavigation');
    } else {
      console.log('else => ');
      document.getElementById('navbarIcon').classList.add('NavigationBody');
      document.getElementById('navbarIcon').classList.remove('OpenNavigation');
    }
  }

}
