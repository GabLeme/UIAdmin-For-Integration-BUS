import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/core/apis.service';
import { ModalService } from 'src/app/shared/_modal';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-environments-list',
  templateUrl: './environments-list.component.html',
  styleUrls: ['./environments-list.component.scss']
})
export class EnvironmentsListComponent implements OnInit {

  constructor(
    private apisService: ApisService,
    private modalService: ModalService,
    private sidebar: SidebarComponent
  ) { }

  event: any = 'create';
  envs: any;
  envName: string = '';
  basePath: string = '';
  envWasCreated: boolean = false;
  updateId: any;
  message: string = '';
  ngOnInit() {
    this.apisService.getEnvironments().subscribe((envs) => {
      this.envs = envs;

      console.log(this.envs)
    })

  }

  handleCreate() {
      this.apisService.createEnvironment(this.envName, this.basePath).subscribe((env) => {
        this.message = "Ambiente criado! Recomendamos que atualize a página."
        this.ngOnInit();
        this.closeModal('env-add-modal');
        // this.sidebar.ngOnInit();
        // alert("Ambiente criado, recomendamos q")
        this.envWasCreated = true;
        setTimeout(() => {
          this.envWasCreated = false;
        }, 3000)
      })   
  }

  handleUpdate(environ) {
    this.apisService.findEnvironmentById(environ._id).subscribe((e) => {
      this.event = 'update';
      let environment = JSON.stringify(e);
      this.envName = JSON.parse(environment).name;
      this.basePath = JSON.parse(environment).basePath;
      this.updateId = JSON.parse(environment)._id;
      this.openModal('env-add-modal');
      
    })
  }

  createEnv() {
    this.event = 'create';
    this.envName = '';
    this.basePath = '';
    this.openModal('env-add-modal');
  }

  updateEnv() {
    this.apisService.updateEnvironment(this.updateId, this.envName, this.basePath).subscribe((env) => {
      console.log(this.updateId)
      console.log(this.envName)
      console.log(this.basePath)
      this.message = "Ambiente atualizado! Recomendamos que atualize a página."
      this.ngOnInit();
      this.closeModal('env-add-modal');
      // this.sidebar.ngOnInit();/
      // alert("Ambiente criado, recomendamos q")
      this.envWasCreated = true;
      this.event === 'create';
      setTimeout(() => {
        this.envWasCreated = false;
      }, 3000)
    }, (err) => {
      console.log("err")
      console.log(err)
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  deleteEnvironment(env) {
    this.apisService.deleteEnvironment(env._id).subscribe((del) => {
      this.message = `Ambiente: ${env.name} removido com sucesso! 
        Recomendamos que atualize a página.
      `
      this.ngOnInit();
      this.envWasCreated = true;
      setTimeout(() => {
        this.envWasCreated = false;
      }, 3000)
    })
  }

}
