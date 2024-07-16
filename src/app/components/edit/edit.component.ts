import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router'; // Cargar modulos de router

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrl: './edit.component.css',
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit{

  public title: string;
	public project!: Project; //Esperar **************
	public save_project: any;
	public status!: string; //***** */
	public filesToUpload!: Array<File>; /*****/
  public url: string;

	constructor(
		private _projectService: ProjectService,
		private _uploadService: UploadService,
    private _route: ActivatedRoute, // Servicios de rutas (para que funcione el params)
    private _router: Router
	){
		this.title = "Editar proyecto";
    this.url = Global.url;
	}

  ngOnInit(){
    this._route.params.subscribe((params: any) => {
      let id = params.id; // *** Tal vez hay que hacer correccion de los [] y quitarlos

      this.getProject(id);
    });
  }

  getProject(id: any) /* Creo que esta si es necesaria */{
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
        console.log(this.project)
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  //---------------------------------------------------------------------------
  /*form: any */
  onSubmit(form: any){
		console.log('entre onSubmit');
		// Guardar datos básicos
		this._projectService.updateProject(this.project).subscribe(
			response => {
				if(response.projectUpdated){
					// console.log('entre al response')
					// Subir la imagen
					if(this.filesToUpload){
            
						this._uploadService.makeFileRequest(Global.url+"/upload-image/"+response.projectUpdated._id, [], this.filesToUpload, 'image')
						.then((result:any) => {						

							this.save_project = result.project; // Hacer el link -- result.project;
              
							this.status = 'success';
							// console.log(response);
							//form.reset();
						});
					}else{
						this.save_project = response.projectUpdated;
						this.status = 'success';
            
						// form.reset();
					}
					
				}else{
					this.status = 'failed';
          console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
    
	}

  fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}
