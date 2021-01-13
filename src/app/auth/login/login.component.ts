import { Component, OnInit,NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appService:AppServiceService,private toastr: ToastrService,private router:Router) {}

  ngOnInit(): void {
    this.appService.getCurrentUser();
    if(this.appService.user){
      this.router.navigate(["weather"]);
    }
  }
  login(name:string,password:string){
    let resp=this.appService.login(name,password);
    if(resp.success){
      this.toastr.success("Sikeres bejelentkezés!");
      this.router.navigate(["weather"]);
    }else{
      this.toastr.error(resp.errorMessage);
    }
  }
}
