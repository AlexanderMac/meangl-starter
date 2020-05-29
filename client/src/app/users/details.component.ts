import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../_core/notification.service';
import { UserService } from './service';
import { User } from './model';

@Component({
  selector: 'am-user-details',
  template: require('./details.component.pug')
})
export class UserDetailsComponent implements OnInit, OnDestroy {
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
    this.loadUser();
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
}
