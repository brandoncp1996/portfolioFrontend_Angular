import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $:any; 

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit{

  @Input() anchura: number | undefined;
  @Input('etiquetas') captions: boolean | undefined;

  @Output() conseguirAutor = new EventEmitter(); //Con este objeto se crea nuevos eventos

  public autor: any;

  constructor(){

    this.autor = {
      nombre: "Brandon Ceron",
      website: "brandoncp.com",
      youtube: "Brandon Ceron Web"
    }

  }
  
  ngOnInit(): void {
    $("#logo").click(function(e: { preventDefault: () => void; }){
      e.preventDefault();
      $("header").css("background","green")
                 .css("height","50px"); 
    });
    
    ($('.galeria')as any).bxSlider({
      mode: 'fade',
      captions: this.captions,
      slideWidth: this.anchura
    });

    //Nota: tambien se puede lanzar el evento directamente en el OnInit
    this.conseguirAutor.emit(this.autor);
    
  }

  lanzar(event: any){
    //console.log(event); Solo prueba para saber que toma los datos
    this.conseguirAutor.emit(this.autor);
  }

}
