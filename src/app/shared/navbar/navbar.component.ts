import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/app-service.service';
import Locations from 'src/app/models/Locations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() selectedIndex: number;
  @Input() set locations(value: string) {
    if (value) {
      this.locationsParsed = JSON.parse(value);
    }
  }
  @Output() navigationEvent = new EventEmitter<number>();
  @Output() deleteLocationEvent = new EventEmitter<number>();

  locationsParsed: Locations[];
  constructor(private appService:AppServiceService,private router:Router) {}

  ngOnInit(): void {}

  changeLocation(value: number) {
    console.log('Change location to ' + value);
    this.navigationEvent.emit(value);
  }

  deleteLocation(value: number){
    console.log('Delete location' + value);
    this.changeLocation(0);
    this.deleteLocationEvent.emit(value);
  }

  logout(){
    this.appService.logout();
    this.router.navigate(["/","auth"]);
  }
}
