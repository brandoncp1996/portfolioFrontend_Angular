import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  
  public title: string;
  public subtitle: string;
  public web: string;

  constructor() {
    this.title = "Brandon Ceron Perez";
    this.subtitle = "Desarrollador web y Formador";
    this.web = "brandonweb.de"
  }

}


