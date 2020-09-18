import { Component } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent {

  roles = ['Admin', 'Super User', 'Guest', 'Staff']

  model = new User(1, 'Aaron', 'Developer')
  submitted = false;
  onSubmit() { this.submitted = true; }



  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model) }



  autoUser() {
    const myUser = new User(1, 'Aaron', 'Developer');

    console.log('My hero is called ' + myUser.name);
  }


}
