import { Component, OnInit,Input, Output,EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-server-selection',
  templateUrl: './server-selection.component.html',
  styleUrls: ['./server-selection.component.scss']
})
export class ServerSelectionComponent implements OnInit {

  @Input('integration_servers_disponiveis')
  servers: any;
  @Output('integration_servers_selecionados')
  saida: EventEmitter<String[]> = new EventEmitter();

  selectedServers: String[];

  constructor() {

  }

  ngOnInit() {
  }

  handleServeSelection(){
    var selectedCheckBoxes = document.querySelectorAll('input[name=serverSelection]:checked')
    this.selectedServers = [];
    selectedCheckBoxes.forEach((box)=>{
      this.selectedServers.push(box.id);
    })
    console.log(JSON.stringify(this.selectedServers));
    this.saida.emit(this.selectedServers);
  }
}
