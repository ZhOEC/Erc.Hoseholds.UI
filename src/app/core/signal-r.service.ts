import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { UserNotification } from './user-notification';
import { BranchOfficeService } from '../shared/services/branch-office.service';
import { NotificationService } from '../shared/components/notification/notification.service'

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection

  constructor(private authService: AuthService, private notification: NotificationService, private branchOfficeService: BranchOfficeService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.userNotificationHub, { accessTokenFactory: () => this.authService.getAccessTokenAsync() })
      .withAutomaticReconnect()
      .build();
  }

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        this.hubConnection.onclose(() => this.startConnection());
      })
      .catch(err => {
        console.log(`Error while starting connection: ${err}. Trying reconnect`)
        setTimeout(() => this.startConnection(), 50000);
      })
  }

  public addNotficationListener = () => {
    this.hubConnection.on('ShowUserNotification', (data: UserNotification) => {
      switch (data.uiModule) {
        case 'branch-office':
          this.branchOfficeService.refreshBranchOffices()
          break;

        default:
          break;
      }

      this.notification.show(data.type, data.title, data.text, 5000)
    });
  }
}
