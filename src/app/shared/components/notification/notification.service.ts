import { Injectable } from '@angular/core'
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Injectable()
export class NotificationService {
  constructor(private notification: NzNotificationService) { }

  show(type: string, title: string, text: string, duration: number = 15000) {
    this.notification.create(type, title, text, { nzDuration: duration });
  }
}
