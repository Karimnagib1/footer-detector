import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pdfUrl!: string;
  viewLine: boolean = false;
  yRatio!: number;

  onPdfUrlChange(pdfUrl: {res: string, line: boolean}) {
    this.pdfUrl = pdfUrl.res;
    this.viewLine = pdfUrl.line;
  }


  onYRatioChange(y: number){
    this.yRatio = y;
  }

}
