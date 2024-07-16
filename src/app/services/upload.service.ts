import { Injectable } from "@angular/core";
import { Global } from "./global";

@Injectable()
export class UploadService{
    
    public url: string; //Definir propiedad de la url del api

    constructor(){
        this.url = Global.url; // Asignarle un valor a la url
    }

    //Metodo para subir las imagenes
    makeFileRequest(url: string, params: Array<string> /*Parametros*/, files: Array<File>, name: string /*nombre del archivo*/){ 

        return new Promise(function(resolve, reject){
            var formData:any = new FormData(); /*simular un formulario clasico*/
            var xhr = new XMLHttpRequest(); /*peticion ajax*/

            //For para recorrer archivos
            for(var i = 0; i < files.length; i++){
                formData.append(name, files[i], files[i].name);
            }

            //Peticion AJAX
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4)/*Este valor siempre es así*/{
                    if(xhr.status == 200)/*Peticion 200 es que si funciono*/{
                        resolve(JSON.parse(xhr.response));
                    } else {
                    reject(xhr.response); /*Aqui es que no ha funcionado*/
                    }
                }
            }

            xhr.open('POST', url, true); /* Paso final para hacer la peticion */
            xhr.send(formData); /* orden para enviar archivos al Backend*/

        });

    }
}