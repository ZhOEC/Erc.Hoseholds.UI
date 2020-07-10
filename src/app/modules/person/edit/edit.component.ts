import { Component, OnInit, AfterViewInit } from '@angular/core'
import { PersonService } from 'src/app/shared/services/person.service'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { Person } from 'src/app/shared/models/person.model'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class PersonEditComponent implements OnInit, AfterViewInit {
  person: Person
  isSubmit = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService,
    private notification: NotificationComponent) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.personService.getOne(+params.get('id')))
    ).subscribe(data => {
      this.person = data
    })
  }

  cancel() {
    this.router.navigate(['accounting-points/', 10018022 /* this.person.id */])
  }

  submitForm(person: Person) {
      this.personService.update(person).subscribe(
        () => {
          this.isSubmit = false
          this.notification.show('success', 'Успіх', `Дані власника, успішно оновлено!`)
        },
        () => {
          this.isSubmit = false
          this.notification.show('error', 'Фіаско', `Не вдалося оновити дані власника!`)
        }
      )
  }
}
