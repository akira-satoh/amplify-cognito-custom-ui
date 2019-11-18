import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

  constructor(private router: Router) { }

  async ngOnInit() {
    try {
      await Auth.signOut()
      this.router.navigate(['/'])
    } catch (err) {
      console.error(err)
    }

  }

}
