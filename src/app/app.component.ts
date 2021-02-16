import { Component } from '@angular/core'
import { AuthService } from './core/auth/auth.service'
import { BranchOfficeService } from './shared/services/branch-office.service'
import { BranchOffice } from './shared/models/branch-office.model'
import { Observable } from 'rxjs'
import { SignalRService } from './core/signal-r.service'
import { User } from './core/user'
import { UserService } from './core/auth/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser$: Observable<User>
  branchOffices$: Observable<BranchOffice[]>

  visibilityDrawer = false

  constructor(
    private authService: AuthService, 
    private signalRService: SignalRService,
    private branchOfficeService: BranchOfficeService, 
    private userService: UserService) {}

  ngOnInit() {
    this.currentUser$ = this.userService.getCurrentUser()
    this.branchOffices$ = this.branchOfficeService.getBranchOffices()
    this.signalRService.startConnection()
    this.signalRService.addNotficationListener()
  }

  isUser() {
    return this.userService.isUser()
  }
  
  isBranchOfficeEngineer() {
    return this.userService.isBranchOfficeEngineer()
  }
  
  isOperator() {
    return this.userService.isOperator()
  }
  
  isAdmin() {
    return this.userService.isAdmin()
  }

  logout() {
    this.authService.logout()
  }
}