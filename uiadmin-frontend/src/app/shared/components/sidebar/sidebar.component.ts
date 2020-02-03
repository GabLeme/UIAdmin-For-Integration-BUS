import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/core/apis.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;

function createDropDown() {
  var dropdown = document.getElementsByClassName("dropdown-btn");
  var i;

  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  }
}

interface Environment {
  _id: string,
  basePath: string,
  mode: string,
  theme: string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private apisService: ApisService,
    private router: Router,
    private location: Location
    
    ) { }

  environmentsList: Array<Environment> = [];

  ngOnInit() {
    // console.log('was call')
    createDropDown();
    // get cookie and pass to list environments
    this.apisService.getEnvironments().subscribe((environments) => {
      this.environmentsList = environments as Array<Environment>;
    })
  }

  hideMenu(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  }

  handlerLink(environment) {
    this.router.navigateByUrl(`environment/${environment._id}`);
  }

  handleLinkUser() {
    this.router.navigateByUrl(`users`);
  }

  handleLinkEnv() {
    this.router.navigateByUrl(`environments`);
  }

  previousRoute() {
    this.location.back();
  }
}
