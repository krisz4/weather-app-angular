import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from 'src/app/app-service.service';
import Locations from 'src/app/models/Locations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  selectedIndex: number = 0;
  locations: Locations[] = [];
  locationsString:string;
  private lsKey:string;

  constructor(private toastr: ToastrService,private appService:AppServiceService) {    
    this.appService.getCurrentUser();
    this.lsKey = 'WAPPLocations'+this.appService.user.name;
  }

  ngOnInit() {

    try {
      let list = localStorage.getItem(this.lsKey);
      if (list) {
        this.locations = JSON.parse(list);
      }
    } catch (err) {
      console.error(err);
      this.toastr.error(
        'Mentett helyszínek betöltése sikertelen vagy nincs megadva helyszín!'
      );
    }
    this.locationsString=JSON.stringify(this.locations);
  }

  addLocation(newLocation: Locations) {
    this.locations.push(newLocation);
    this.locationsString=JSON.stringify(this.locations);
    console.log("Location added "+newLocation);
    try {
      localStorage.setItem(this.lsKey, this.locationsString);
    } catch (err) {
      console.error(err);
      this.toastr.error('Helyek mentése sikertelen!');
    }
  }

  changeLocation(index:number){
    this.selectedIndex=index;
  }

  deleteLocation(index:number){
    this.locations.splice(index,1);
    this.locationsString=JSON.stringify(this.locations);
    console.log("Location deleted");
    try {
      localStorage.setItem(this.lsKey, this.locationsString);
    } catch (err) {
      console.error(err);
      this.toastr.error('Helyek mentése sikertelen!');
    }
  }

}
