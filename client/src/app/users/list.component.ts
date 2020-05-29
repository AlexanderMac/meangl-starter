import * as _ from 'lodash';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../_core/notification.service';
import { UserService } from './service';
import { User } from './model';

@Component({
  selector: 'am-user-list',
  template: require('./list.component.pug')
})
export class UserListComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  isSaving: boolean;
  users: User[];
  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private ntfsSrvc: NotificationService,
    private userSrvc: UserService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadUsers(): void {
    this.isLoading = true;
    let subscription = this.userSrvc
      .getUsers()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        users => this.users = users,
        (err: Error) => this.ntfsSrvc.warningOrError('Unable to load users', err)
      );
    this.subscriptions.add(subscription);
  }

  userDetails(user: User): void {
    this.router.navigate(['/users', user.userId]);
  }

  editUser(user: User): void {
    this.router.navigate(['/users/:id/edit', { id: user.userId }]);
  }

  deleteUser(user: User): void {
    let res = confirm(`Delete ${user.name}? The user will be permanently deleted.`);
    if (!res) {
      return;
    }

    this.isSaving = true;
    let subscription = this.userSrvc
      .deleteUser(user.userId)
      .pipe(
        finalize(() => this.isSaving = false)
      )
      .subscribe(
        () => {
          _.remove(this.users, user);
          this.ntfsSrvc.info('User deleted successfully');
        },
        (err: Error) => this.ntfsSrvc.warningOrError('Unable to delete user', err)
      );
    this.subscriptions.add(subscription);
  }
}
