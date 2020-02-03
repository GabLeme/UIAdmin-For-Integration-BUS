import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from 'src/app/core/apis.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-server-content',
  templateUrl: './server-content.component.html',
  styleUrls: ['./server-content.component.scss']
})
export class ServerContentComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private apisService: ApisService,
    private router: Router
  ) { }

  serverInfo: any = [];
  apis: any = [];
  apps : any = [];
  libs: any = [];  
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {

      this.apisService.listServerContent(params['id'], params['serverName']).subscribe((content) => {
        this.serverInfo = content['content'];
        this.serverInfo = JSON.parse(this.serverInfo)['properties'];
        this.apis = content['apis'];
        this.apis = JSON.parse(this.apis)['children'];
        this.apps = content['apps'];
        this.apps = JSON.parse(content['apps'])['children'];
        this.libs = content['libs'];
        this.libs = JSON.parse(content['libs'])['children'];
        console.log(this.apis)
      })
    })
  }


}
