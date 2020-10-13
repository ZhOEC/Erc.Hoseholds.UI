import { Component, OnInit } from '@angular/core'
import { UploadFile } from 'ng-zorro-antd/upload'
import { ConsumptionService } from 'src/app/shared/services/consumption.service'
import { ConsumptionRecord } from 'src/app/shared/models/consumption-record'

@Component({
  selector: 'app-consumption-loader-form',
  templateUrl: './consumption-loader-form.component.html',
  styleUrls: ['./consumption-loader-form.component.scss']
})

export class ConsumptionLoaderFormComponent implements OnInit {
  isSubmitLoading = false
  isSubmitDisabled = true
  fileList: UploadFile[] = []
  problematicRecords: ConsumptionRecord[] = []
  problematicDisplayRecords: ConsumptionRecord[] = []

  constructor(private readonly consumptionService: ConsumptionService) {}
  ngOnInit() {}

  beforeUpload = (file: UploadFile): boolean => {
    if(this.fileList.find(f => f.name == file.name && f.size == file.size)) {
      file.status = "error"
      this.isSubmitDisabled = true
    } else this.isSubmitDisabled = false
    this.fileList = this.fileList.concat(file)

    return false
  }

  removeHandler = (file: UploadFile): boolean => {
    this.fileList = this.fileList.filter(f => f.uid != file.uid)
    var fi = this.fileList.find(f => f.name == file.name && f.size == file.size)
    fi != undefined ? fi.status = "done" : false
    if(!this.fileList.find(f => f.status == "error")) {
      this.isSubmitDisabled = false
    }

    return false
  }

  onSearchChange(searchValue: string) {
    this.problematicDisplayRecords = this.problematicRecords.filter((item: ConsumptionRecord) => item.eic.indexOf(searchValue) !== -1)
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
        this.problematicRecords = r
        this.problematicDisplayRecords = r
        this.isSubmitLoading = false
      },
      pr => {
        this.problematicRecords = pr
        this.isSubmitLoading = false
      }
    )
  }
}
