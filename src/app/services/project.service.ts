import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Peticiones AJAX
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService {
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio de Angular'
    }

    saveProject(project: Project /* Le entra un 'project' de tipo projecto*/): Observable<any> /* Esto es lo que el devuelve */ {
        let params = JSON.stringify(project); // La informacion que entra hay que volverla a este formato
        let headers = new HttpHeaders().set('Content-Type', 'application/json'); // Formato de envio de datos

        return this._http.post(this.url+'/save-project', params, {headers: headers}); // Crear la peticion por post

    }

    getProjects(): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'/projects', {headers: headers})
    }

    getProject(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'/project/'+id, {headers: headers});
    }

    deleteProject(id: any): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url + '/project/' + id, {headers: headers});
    }

    updateProject(project: any): Observable<any>{
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + '/project/' + project._id, params, {headers: headers});
    }
}