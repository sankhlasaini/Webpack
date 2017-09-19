import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdNativeDateModule, DateAdapter, NativeDateAdapter } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { PostLoginHeaderComponent } from './components/postLogin/post-login-header/post-login-header.component';
import { LoginComponent } from './components/loginComponents/login/login.component';
import { SignUpComponent } from './components/loginComponents/sign-up/sign-up.component';
import { LoginLayoutComponent } from './components/loginComponents/login-layout/login-layout.component';
import { AuthGuard } from './AuthGuard/auth.guard';
// import { Angular2SocialLoginModule } from 'angular2-social-login';
import { DashboardComponent } from './components/postLogin/dashboard/dashboard.component';
import { ProfileComponent } from './components/postLogin/profile/profile.component';
import { ProfileService } from './services/profile.service';
import { LoginService } from './services/login.service';
import { SharedService } from './services/shared.service';
import { PincodeComponent } from './components/postLogin/pincode/pincode.component';
import { DataTableModule } from 'angular2-datatable';
import { GovtInfoComponent } from './components/postLogin/govt-info/govt-info.component';
import { HospitalComponent } from './components/postLogin/hospital/hospital.component';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
// App is our top level component
import { AppComponent } from './app.component';
import '../styles/styles.css';
import '../styles/theme.scss';
import '../mdb/css/mdb.min.css';
import '../mdb/css/bootstrap.min.css';


let providers = {
  'google': {
    'clientId': '1095703142723-oombd1h7u6lqvvptouu7bvq8dssr09tu.apps.googleusercontent.com'
  },
  'facebook': {
    'clientId': '1764235857200435',
    'apiVersion': 'v2.9' //like v2.4 
  }
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    PostLoginHeaderComponent,
    LoginComponent,
    SignUpComponent,
    LoginLayoutComponent,
    DashboardComponent,
    ProfileComponent,
    PincodeComponent,
    GovtInfoComponent,
    HospitalComponent,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    // Angular2SocialLoginModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    MdNativeDateModule,
    DataTableModule
  ],
  entryComponents: [
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    AuthGuard, ProfileService, LoginService, SharedService
  ],
})


export class AppModule { }

// Angular2SocialLoginModule.loadProvidersScripts(providers);
