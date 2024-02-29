import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string=""
  password:string=""

  constructor(private toastr: ToastrService,private api:AdminService,private router:Router){

  }

  login(){
    // admin login
    if(this.email && this.password){
      this.api.getAdminDetails().subscribe({
        next:(res:any)=>{
          console.log(res);
          const {email,password} = res
          if(email==this.email && password==this.password){
            this.toastr.success("Login successfull")
            sessionStorage.setItem("adminDetails",JSON.stringify(res))
            // navigate
            this.router.navigateByUrl("/dashboard")
          }
          else{
            this.toastr.error("Invalid email/password")
          }   
        },
        error:(reason:any)=>{
          this.toastr.error(reason.message)
        }
      })
    }
    else{
      this.toastr.info("Please fill the form completely!!!!")
    }
  }
}
