import { Component, OnInit, ViewChild } from '@angular/core';
//import $ from "jquery" -- Al final no funciono para el bxSlider
declare var $:any; 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
  
  public widthSlider: number | undefined;
  public anchuraToSlider: number | undefined;;
  public captions: boolean;

  public autor: any;

  @ViewChild('textos', {static: true}) textos: any;
  
  constructor(){
    this.captions = true;
  }
  
  ngOnInit(): void {
    console.log(this.textos);
    console.log(this.textos.nativeElement.textContent);
  }

  cargarSlider(){
    this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider(){
    this.anchuraToSlider = undefined;
  }
  
  getAutor(event: any){
    console.log(event); //Solo son para prueba
    this.autor = event;
  }
  
  
}

//npm i --save-dev @types/jquery
