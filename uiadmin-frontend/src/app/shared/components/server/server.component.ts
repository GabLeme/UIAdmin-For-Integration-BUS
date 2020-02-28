import { Component, OnInit, Input } from '@angular/core';
import { ConfigComponent } from 'src/app/modules/environment/pages/config/config.component';
import { ApisService } from 'src/app/core/apis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/core/socket.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  @Input() name: string = '';
  @Input() processId: string = '';
  @Input() status: boolean = false;

  environmentId: any = '';

  constructor(
    private apisService: ApisService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private configComponent: ConfigComponent,
    private socketService: SocketService
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.environmentId = params['id'];
    })
  }

  handleStart() {
    this.apisService.startEnvironmentServer(this.environmentId, this.name).subscribe((res) => {
      console.log(res)
      this.configComponent.ngOnInit();
    })
  }

  handleStop() {
    this.apisService.stopEnvironmentServer(this.environmentId, this.name).subscribe((res) => {
      console.log(res)
      this.configComponent.ngOnInit();
    })
  }

  // handleRestart() {
  //   this.apisService.restartEnvironmentServer(this.environmentId, this.name).subscribe((res) => {
  //     console.log(res)
  //     this.configComponent.ngOnInit();
  //   })
  // }

  handleApisOnServer() {
    this.router.navigate([`/environment/${this.environmentId}/server/${this.name}`]);
  }

  handleDelete() {
    this.apisService.deleteServer(this.environmentId, this.name).subscribe((del) => {
      this.configComponent.ngOnInit();
    })
  }
}
