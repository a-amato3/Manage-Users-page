import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user: User = {
    name: '',
    role: '',
    disabled: false,
  }
  constructor(private service: UserService) { }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.user.name != '' && this.user.role != '') {
      this.service.addUser(this.user);
      this.user.name = '';
      this.user.role = '';
    }
  }
}
