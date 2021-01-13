import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Locations from 'src/app/models/Locations';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css'],
})
export class AddLocationComponent implements OnInit {
  @Output() newLocationEvent = new EventEmitter<Locations>();
  @Output() closeModalEvent = new EventEmitter<boolean>();
  locName: string;
  constructor() {}

  ngOnInit(): void {}

  addLocation(value: string) {
    console.log("Add location"+value);
    let newLocation = {
      name: value,
    };
    this.newLocationEvent.emit(newLocation);
  }
  closeModal(){
    this.closeModalEvent.emit(true);
  }
}
