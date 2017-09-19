import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard/auth.guard';

// components
import { LoginComponent } from './components/loginComponents/login/login.component';
import { LoginLayoutComponent } from './components/loginComponents/login-layout/login-layout.component';
import { SignUpComponent } from './components/loginComponents/sign-up/sign-up.component';
import { PostLoginHeaderComponent } from './components/postLogin/post-login-header/post-login-header.component';
import { DashboardComponent } from './components/postLogin/dashboard/dashboard.component';
import { ProfileComponent } from './components/postLogin/profile/profile.component';
import { PincodeComponent } from './components/postLogin/pincode/pincode.component';
import { GovtInfoComponent } from './components/postLogin/govt-info/govt-info.component';
import { HospitalComponent } from './components/postLogin/hospital/hospital.component';
// routes
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '', component: PostLoginHeaderComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'profile', component: ProfileComponent },
            {
                path: 'govt', component: GovtInfoComponent,
                children: [
                    { path: 'pincode', component: PincodeComponent },
                    { path: 'hospital', component: HospitalComponent },
                ]
            }
        ]
    },
    { path: 'signUp', component: SignUpComponent },
    { path: '**', redirectTo: '/' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule],
})

export class AppRoutingModule { };
