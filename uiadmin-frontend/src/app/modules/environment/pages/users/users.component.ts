import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/core/apis.service';
import { ModalService } from 'src/app/shared/_modal';
import { FormControl } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private apisService: ApisService,
    private modalService: ModalService
  ) { }

  users: any = [];
  envs = new FormControl();
  envList: string[] = [];
  selectedEnvs: any = [];
  permissions = new FormControl();
  seletedPermissions: string[] = [];
  ngOnInit() {
    this.apisService.listUsers().subscribe((r) => {
      this.users = r;
    })

    this.apisService.getEnvironments().subscribe((env) => {
      this.envList = env as Array<string>;
    })

    this.envs.valueChanges.subscribe((val) => {
      this.selectedEnvs = val;
    })

    this.permissions.valueChanges.subscribe((val) => {
      this.seletedPermissions = val;
      console.log(val)
    })
  }

  removePermission(event) {
    // console.log()
    // if(!event.source.selected) {
    //   for(let i = 0; i < this.seletedPermissions.length; i++){
    //     for(let j = 0; j < this.selectedEnvs.length; j++){
    //       if(this.seletedPermissions[i].split('#')[1] === this.selectedEnvs[j].split('@')[1]) {
    //         this.seletedPermissions.splice(i, 1);
    //         console.log('tem q sair')
    //         // console.log(this.seletedPermissions[i].split('#')[1])
    //         // console.log(this.selectedEnvs[j].split('@')[1])
    //       }
    //     }        
    //   }
      // this.seletedPermissions.forEach(p => {
      //   this.selectedEnvs.forEach(env => {
      //     if(p.split('#')[1] === env.split('@')[1]) {
      //       this.seletedPermissions.splice(this.seletedPermissions.indexOf(p), 0);
      //     }
      //   })
      // })
      // }
      if(!event.source.selected) {
        console.log("Ambientes")
        console.log(this.selectedEnvs)
        console.log("Permissoes")
        console.log(this.seletedPermissions)
      }
  }


  handleDelete() {

  }

  handleUpdate() {

  }

  handleCreate() {
    const uniq = [...new Set(this.seletedPermissions)];
    console.log(uniq)
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


}
