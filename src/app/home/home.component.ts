import { Component, OnInit } from '@angular/core';
import { ApiService } from '../modules/users/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  adminName:string = ""
  userCount:number = 0
  sideBarStatus:boolean = true;

  constructor(private userApi:ApiService,private router:Router){}

  ngOnInit(): void {
    this.getTotalEmployeeCount()
    if(sessionStorage.getItem("adminDetails")){
      this.adminName = JSON.parse(sessionStorage.getItem("adminDetails")||"").name
    }
  }

  menuBtnClicked(){
    this.sideBarStatus = !this.sideBarStatus
  }
  
  getTotalEmployeeCount(){
    this.userApi.getAllUsersAPI().subscribe((res:any)=>{
      this.userCount = res.length - 1
    })
  }

  onAdminChange(event:any){
    this.adminName = event
  }

  Logout(){
    sessionStorage.clear()
    this.router.navigateByUrl("")
  }

}
