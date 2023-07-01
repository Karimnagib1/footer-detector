import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as pdfjsLib from 'pdfjs-dist';
import { PdfService } from 'src/app/services/pdf.service';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

// import { pdfjsWorker} from 'pdfjs-dist/build/pdf.worker.entry';

@Component({
  selector: 'app-pdf-upload',
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.css']
})
export class PdfUploadComponent {

  @ViewChild('pdfCanvas') pdfCanvas!: ElementRef<HTMLCanvasElement>;
  @Output() pdfUrlChange = new EventEmitter<string>();
  @Output() viewLineToggle = new EventEmitter<boolean>();
  @Output() yRatioChange = new EventEmitter<number>();


  pdfUploadForm!: FormGroup;
  file?: File;

  constructor( private pdf:PdfService ) {}

  ngOnInit() {
    this.pdfUploadForm = new FormGroup({
      pdf: new FormControl(null, Validators.required),
    });
  }

  onFileSelect(event: any) {
    this.viewLineToggle.emit(false);
    const file:File = event.target.files[0];
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      this.pdfUrlChange.emit(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    console.log(this.file);
    this.pdf.postCheckPdf(this.file!).subscribe(response => {
      console.log(response);
      this.yRatioChange.emit(response.y_ratio);
      this.viewLineToggle.emit(true);
      // handle response from server
    }, error => {
      console.error(error);
      // handle error
    });
  }

}