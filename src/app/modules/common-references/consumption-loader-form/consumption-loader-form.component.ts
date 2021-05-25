import { Component, OnInit } from '@angular/core'
import { NzUploadFile  } from 'ng-zorro-antd/upload'
import { ConsumptionService } from 'src/app/shared/services/consumption.service'
import { ConsumptionRecord } from 'src/app/shared/models/consumption-record'
import { NotificationService } from '../../../shared/components/notification/notification.service'

@Component({
  selector: 'app-consumption-loader-form',
  templateUrl: './consumption-loader-form.component.html',
  styleUrls: ['./consumption-loader-form.component.scss']
})

export class ConsumptionLoaderFormComponent implements OnInit {
  isSubmitLoading = false
  isSubmitDisabled = true
  fileList: NzUploadFile[] = []
  problematicDisplayRecords: ConsumptionRecord[] = []

  constructor(private readonly consumptionService: ConsumptionService,
    private notification: NotificationService) {}
  ngOnInit() {}

  beforeUpload = (file: NzUploadFile): boolean => {
    if(this.fileList.find(f => f.name == file.name && f.size == file.size)) {
      file.status = "error"
      this.isSubmitDisabled = true
    } else this.isSubmitDisabled = false
    this.fileList = this.fileList.concat(file)

    return false
  }

  removeHandler = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.filter(f => f.uid != file.uid)
    var fi = this.fileList.find(f => f.name == file.name && f.size == file.size)
    fi != undefined ? fi.status = "done" : false
    if(!this.fileList.find(f => f.status == "error")) {
      this.isSubmitDisabled = false
    }

    return false
  }

  onSubmit() {
    this.isSubmitLoading = true
    
    const formData = new FormData()
    this.fileList.forEach(
      file => {
        formData.append('files', file as undefined as File)
    })

    this.consumptionService.uploadFile(formData).subscribe(
      r => {
        this.problematicDisplayRecords = r
        this.fileList = []
        this.isSubmitLoading = false
        this.notification.show('success', 'Успіх', `Файл успішно завантажено!`)
      },
      _ => {
        this.isSubmitLoading = false
        this.notification.show('error', 'Фіаско', `Не вдалося завантажити файл!`)
      }
    )
  }
}
