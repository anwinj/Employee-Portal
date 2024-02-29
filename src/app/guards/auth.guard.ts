import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  
  const authStatus = inject(AdminService)
  const toastr = inject(ToastrService)
  const router = inject(Router)

  if(authStatus.isLoggedIn()){
    return true
  }
  else{
    toastr.warning("Operation denied...Please Login!!!")
    router.navigateByUrl("")
    return false
  }

};
