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

  onPdfUrlChange(pdfUrl: string) {
    this.pdfUrl = pdfUrl;
  }

  onViewLineToggle(value: boolean){
    console.log("working");
    this.viewLine = value;
  }
  onYRatioChange(y: number){
    this.yRatio = y;
  }

}
