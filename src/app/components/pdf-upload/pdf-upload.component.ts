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
  @Output() pdfUrlChange = new EventEmitter<{res: string, line: boolean}>();
  @Output() yRatioChange = new EventEmitter<number>();


  pdfUploadForm!: FormGroup;
  file?: File;
  pdfUrl?: string;
  constructor( private pdf:PdfService ) {}

  ngOnInit() {
    this.pdfUploadForm = new FormGroup({
      pdf: new FormControl(null, Validators.required),
    });
  }

  onFileSelect(event: any) {
    const file:File = event.target.files[0];
    this.file = file;

    const reader = new FileReader();
    reader.onload = (event) => {
      this.pdfUrl = event.target?.result as string;
      this.pdfUrlChange.emit({res: this.pdfUrl, line: false});
    };
    reader.readAsDataURL(file);

  }

  onSubmit() {
    this.pdf.postCheckPdf(this.file!).subscribe(response => {

      this.pdfUrlChange.emit({res: this.pdfUrl!, line: true});

      this.yRatioChange.emit(response.y_ratio);
      // handle response from server
    }, error => {
      console.error(error);
      // handle error
    });
  }

}