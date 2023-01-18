import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileBatch } from '../../models';



@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  private _files:any=[]
  private _totalFileSize:number=0;

  _batches: FileBatch[] = []
  @Input() multiple=false;
  @Input() batchSize:number =5000000
  private _batch = false

  @Output() files=new EventEmitter()
  @Output() totalFileSize=new EventEmitter()
  @Output() batches = new EventEmitter()

  @Input() public set batch(v : boolean) {
    this._batch = v;
  }

  public get batch() : boolean {
    return this._batch
  }


  constructor() { }

  ngOnInit(): void {
  }
  uploadFile(event) {
    if(!this.multiple){
      this.clear()
    }
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this._totalFileSize = this._totalFileSize + element.size
      this._files.push(element)
    }
    this.emit()
  }

  private createBatches(){
    let batch: FileBatch ={batchSize : 0,files:[]}
    this._files.forEach(element => {
      batch.batchSize = batch.batchSize + element.size
      batch.files.push(element)

      if(batch.batchSize > this.batchSize || this._files[this._files.length -1] === element){
        this._batches.push(batch)
        batch = {batchSize : 0,files:[]}
      }
    });
    this.batches.emit(this._batches)

  }

  private emit(){
    if(this.batch){
      this.createBatches()
    }
    this.totalFileSize.emit(this._totalFileSize);
    this.files.emit(this._files)
  }
  deleteAttachment(index) {
    this._totalFileSize = this._totalFileSize - this._files[index].size
    this._files.splice(index, 1)
    this.emit()
  }
  private clear(){
    this._files = []
    this._totalFileSize=0
  }

}
