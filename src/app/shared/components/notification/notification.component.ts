import { Component, Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-notification',
  template: '',
  styles: []
})

export class NotificationComponent {
  constructor(private notification: NzNotificationService) { }

  show(type: string, title: string, text: string, duration: number = 15000) {
    this.notification.create(type, title, text, { nzDuration: duration });
  }
}
