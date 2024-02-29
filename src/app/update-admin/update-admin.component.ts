import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
  
  @Output() onAdminChange = new EventEmitter()
  adminDetails:any = {}
  editAdminStatus:boolean = false
  profilePicture:string = "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1709116294~exp=1709116894~hmac=6d3f4c643a3e86247f8749cab2d42a0e936662a75578b8bc3e9735f44cdc98a5"

  constructor(private adminAPI:AdminService, private toastr:ToastrService){}

  ngOnInit(): void {
    this.adminAPI.getAdminDetails().subscribe((res:any)=>{
      this.adminDetails = res
      if(res.profilePic){
        this.profilePicture = res.profilePic
      }
    })
  }

  editAdminBtn(){
    this.editAdminStatus = true
  }

  onCancel(){
    this.editAdminStatus = false
  }

  getFile(event:any){
    let file = event.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (event:any)=>{
      // console.log(event.target.result);
      this.adminDetails.profilePic = event.target.result
      this.profilePicture = event.target.result
    }
  }

  editAdmin(){
    this.adminAPI.updateAdminAPI(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.editAdminStatus = false
        this.toastr.success("Profile Updated successfully")
        sessionStorage.setItem("adminDetails",JSON.stringify(res))
        this.onAdminChange.emit(res.name)
      },
      error:(reason:any)=>{
        console.log(reason);
        this.toastr.warning("Updation Failed!!!....")
      }
    })
  }

}
