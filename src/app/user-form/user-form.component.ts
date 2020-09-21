import { Component, OnDestroy, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Subscription } from "rxjs";
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit, OnDestroy {

  @Input() user: User[];
  sub: Subscription;
  searchText: string = "";
  editState: boolean = false;
  userToEdit: User;
  public disableUser: boolean = false;


  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor(private service: UserService) { }

  ngOnInit() {
    this.sub = this.service
      .getUsers()
      .subscribe(
        user => (this.user = user))
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  filterCondition(user: User) {
    return user.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 ||
    user.role.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1
  }

  deleteUser(event, user: User) {
    this.clearState();
    this.service.deleteUser(user);
  }

  editUser(event, user: User) {
    this.editState = true;
    this.userToEdit = user;
  }
  updateUser(user: User) {
    this.service.updateUser(user);
    this.clearState();
  }

  toggleEnable(user: User) {
    user.checked = !user.checked;
    this.service.updateUser(user);
      }

  clearState() {
    this.editState = false;
    this.userToEdit = null;
  }

  enable(){
    this.disableUser = false
    this.userToEdit = null;
 }

 disable(){
   this.disableUser = true
   this.userToEdit = null;
 }
}




