import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-notification',
  template: '',
  styles: []
})

export class NotificationComponent {
  constructor(private notification: NzNotificationService) {}

  show(type: string, title: string, text: string) {
    this.notification.create(type, title, text);
  }
}
