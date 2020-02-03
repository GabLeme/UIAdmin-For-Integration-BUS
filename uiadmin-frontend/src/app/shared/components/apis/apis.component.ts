import { Component, OnInit, Input } from '@angular/core';
import { ApisService } from 'src/app/core/apis.service';
import { ServerContentComponent } from 'src/app/modules/environment/pages/server-content/server-content.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.scss']
})
export class ApisComponent implements OnInit {

  @Input() name: string = '';
  @Input() itemType: string = '';

  envId: string = '';
  serverName: string = '';
  constructor(
    private apisService: ApisService,
    private activatedRoute: ActivatedRoute,
    private serverContent: ServerContentComponent
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.envId = params['id'];
      this.serverName = params['serverName'];
    })
  }

  handleStop() {
    this.apisService.stopApi(this.envId, this.name, this.itemType, this.serverName).subscribe((stop) => {
      this.serverContent.ngOnInit();
    })
  }

  handleStart() {
    this.apisService.startApi(this.envId, this.name, this.itemType, this.serverName).subscribe((stop) => {
      this.serverContent.ngOnInit();
    })
  }

  handleDelete() {
    this.apisService.deleteApi(this.envId, this.name, this.itemType, this.serverName).subscribe((stop) => {
      this.serverContent.ngOnInit();
    })
  }

}
