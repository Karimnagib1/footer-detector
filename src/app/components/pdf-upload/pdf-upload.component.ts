import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as pdfjsLib from 'pdfjs-dist';

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

  pdfUploadForm!: FormGroup;
  constructor(
           ) {}

  ngOnInit() {
    this.pdfUploadForm = new FormGroup({
      pdf: new FormControl(null, Validators.required),
    });
  }

  onFileSelect(event: any) {
    const file:File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {

      // this.pdfUrlChange.emit(event.target?.result as string);
      pdfjsLib.getDocument({ url: event.target?.result as string }).promise.then(pdf => {
        pdf.getPage(1).then(page => {
          const viewport = page.getViewport({ scale: 1 });
          const canvas = this.pdfCanvas.nativeElement;
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const context = canvas.getContext('2d') as CanvasRenderingContext2D;
          page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
            // draw line on canvas
            context.beginPath();
            context.moveTo(100, 100);
            context.lineTo(200, 200);
            context.stroke();
            // export modified PDF file
            const dataUri: string= canvas.toDataURL('application/pdf');
            // this.pdfUrlChange.emit(dataUri);
            // this.pdfUrlChange.emit(dataUri as string);
            // const link = document.createElement('a');
            // link.href = dataUri;
            // link.download = file.name;
            // link.click();
          });
        });
      });

    };
    reader.readAsDataURL(file);
  }

  onSubmit() {

  }

}