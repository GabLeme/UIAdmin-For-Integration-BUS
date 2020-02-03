import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/core/apis.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})

export class ConfigComponent implements OnInit {

  constructor(
    private apisService: ApisService,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) { }

  systemInfo: any = [];
  servers: any = [];
  env_id: any;
  serverName: any;
  debugPort: any;
  mqName: any;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const envId = params['id'];
      this.env_id = params['id'];
      this.apisService.getEnvironmentConfig(envId).subscribe((config) => {
        this.servers = JSON.parse(config['servers'])['children'];
        this.systemInfo = config['systemInfo'];
        //console.log(this.servers)
      })
    })
  }


  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  handleCreateServer() {
    this.apisService.createServer(
      this.env_id,
      this.serverName,
      this.debugPort,
      this.mqName
    ).subscribe((created) => {
      this.ngOnInit();
      this.closeModal('add-server-modal')
    })
  }

}
