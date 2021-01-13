import { Component, NgZone, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-default-route',
    styles: [],
    template: ''
})
export class DefaultRouteComponent implements OnInit {

    constructor(private userService: AppServiceService, private router: Router,private ngZone: NgZone) { }

    ngOnInit(): void {
        this.ngZone.run(() => {
            this.router.navigateByUrl(this.userService.getDefaultRoute());
          });

    }

}
