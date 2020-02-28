import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import { ApisService } from 'src/app/core/apis.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/shared/_modal';
import { SocketService } from 'src/app/core/socket.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})

export class ConfigComponent implements OnInit {

  constructor(
    private apisService: ApisService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private socketService: SocketService
  ) { }

  systemInfo: any = [];
  servers: any = [];
  env_id: any;
  serverName: any;
  debugPort: any;
  mqName: any;

   
  gaugeCpuType = "semi";
  cpuPercentage = 0;
  gaugeCpuLabel = "Cpu Percentage";
  gaugeCpuAppendText = "%";

  gaugeMemType = "semi";
  memPercentage = 0;
  gaugeMemLabel = "Mem Percentage";
  gaugeMemAppendText = "%";

  thresholdConfig = {
    '0': {color: 'green'},
    '40': {color: 'orange'},
    '75.5': {color: 'red'}
  };

  ngOnInit() {

    
    this.socketService.listen('HealthCheck').subscribe((r) => {
      console.log(r)
      if(r['type'] === 'cpu') this.cpuPercentage = Math.round(r['data'] * 100) / 100;
      else if(r['type'] === 'mem') this.memPercentage = Math.round(r['data'] * 100) / 100;
    })

    this.route.params.subscribe((params) => {
      const envId = params['id'];
      this.env_id = params['id'];
      this.apisService.getEnvironmentConfig(envId).subscribe((config) => {
        // console.log((c))
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


  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  deployment_log;
  selected_files_info: any[] = [];
  selectedIntegrationServers;

  public handleDeploy() {
    // alert(!this.selectedIntegrationServers);
    if(this.selectedIntegrationServers == undefined || this.selectedIntegrationServers.length == 0){
      alert('Não há servidores para realizar deploy! 😬');
    }
    else{
      const fileUpload = this.fileUpload.nativeElement;
      fileUpload.click();
      fileUpload.onchange = () => {
        for (const file of fileUpload.files) {
          this.selected_files_info.push({ name:file.name,size:file.size,datetime:new Date()});
          //TODO: germano
          this.apisService.deployBarFile(this.env_id,file,JSON.stringify(this.selectedIntegrationServers))
          .subscribe(
            (result) => {
              this.deployment_log = JSON.stringify(result);
          },
            (err) => {
              this.deployment_log = JSON.stringify(err);
            }
          )
        }
      };
      this.fileUpload.nativeElement.value = '';
    }
  }

  setSelectedIntegrationArray(selectedIntServers){
    console.log(selectedIntServers)
    this.selectedIntegrationServers = selectedIntServers;
  }
}
