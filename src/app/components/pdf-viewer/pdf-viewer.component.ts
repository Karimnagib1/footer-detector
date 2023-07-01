import { Component, ElementRef, Input, SimpleChanges, ViewChild,  } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css'],
})
export class PdfViewerComponent {

  constructor(private sanitizer: DomSanitizer) {}
  @ViewChild('pdfCanvas') pdfCanvas!: ElementRef<HTMLCanvasElement>;

  
  @Input() pdfUrl!: string;
  @Input() viewLine!: boolean;
  @Input() yRatio!: number;

  ngOnChanges(changes: SimpleChanges) {
    pdfjsLib.getDocument({ url: this.pdfUrl }).promise.then(pdf => {
      pdf.getPage(1).then(page => {
        const viewport = page.getViewport({ scale: 1 });
        const canvas = this.pdfCanvas.nativeElement;
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
          // // draw line on canvas
          if (this.viewLine){
            context.beginPath();
            context.moveTo(0.1 * viewport.width, this.yRatio * viewport.height);
            context.lineTo(0.9 * viewport.width, this.yRatio * viewport.height);
            context.strokeStyle = "green";
            context.stroke();
            
          }

          const dataUri: string= canvas.toDataURL('application/pdf');


        });
      });
    });
  }


  get sanitizedPdfUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl || '');
  }
}
