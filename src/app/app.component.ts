import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pdf-merger';
  formData = new FormData();
  files: FileList | null = null;
  uploadProgress: { fileName: string; progress: number }[] | null = null;
  uploadError: string | null = null;
  uploadSuccess: string | null = null; // Add this property to fix the error

  constructor(public http: HttpClient) {}

  onFileSelected(event: any) {
    this.files = event.target.files;
    if (this.files) {
      for (let i = 0; i < this.files.length; i++) {
        this.formData.append('pdfs', this.files[i], this.files[i].name);
      }
    }
  }

  uploadFiles() {
    this.http
      .post('http://localhost:3000/merge', this.formData, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Or trigger download
      });
  }
}
