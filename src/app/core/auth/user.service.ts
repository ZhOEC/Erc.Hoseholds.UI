import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt/src/jwthelper.service'
import { AuthService } from './auth.service'
import { User } from '../user'
import { Role } from '../role'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly jwtHelper = new JwtHelperService()
  private user: BehaviorSubject<User> = new BehaviorSubject<User>(null)

  constructor(private authService: AuthService) {
    this.getUserAsync()
  }

  private async getUserAsync() {
    let token = await this.authService.getAccessTokenAsync()
    let dataToken = this.jwtHelper.decodeToken(token)
    
    this.user.next({
      userName: dataToken.username,
      roles: dataToken.roles
    })
  }

  getCurrentUser() {
    return this.user
  }

  isUser() {
    return this.user.getValue()?.roles.includes(Role.User)
  }

  isBranchOfficeEngineer() {
    return this.user.getValue()?.roles.includes(Role.BranchOfficeEngineer)
  }

  isOperator() {
    return this.user.getValue()?.roles.includes(Role.Operator)
  }

  isAdmin() {
    return this.user.getValue()?.roles.includes(Role.Administrator)
  }
}
