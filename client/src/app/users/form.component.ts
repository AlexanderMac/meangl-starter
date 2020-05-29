import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../_core/notification.service';
import { UserService } from './service';
import { User } from './model';

@Component({
  selector: 'am-user-form',
  template: require('./form.component.pug')
})
export class UserFormComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  isSaving: boolean;
  userId: string;
  user: User;
  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ntfsSrvc: NotificationService,
    private userSrvc: UserService
  ) {
    this.userId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    if (!this.userId) {
      this.user = new User();
    } else {
      this.loadUser();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadUser(): void {
    this.isLoading = true;
    let subscription = this.userSrvc
      .getUser(this.userId)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        user => this.user = user,
        (err: Error) => {
          this.ntfsSrvc.warningOrError('Unable to load user', err);
          this.router.navigate(['/users']);
        }
      );
    this.subscriptions.add(subscription);
  }

  saveUser(): void {
    this.isSaving = true;
    let fn = this.userId ? 'updateUser' : 'createUser';
    let subscription = this.userSrvc[fn](this.user)
      .pipe(
        finalize(() => this.isSaving = false)
      )
      .subscribe(
        () => {
          this.ntfsSrvc.info(`User ${this.userId ? 'updated' : 'created'} successfully`);
          this.router.navigate(['/users']);
        },
        (err: Error) => this.ntfsSrvc.warningOrError('Unable to save user', err)
      );
    this.subscriptions.add(subscription);
  }
}
