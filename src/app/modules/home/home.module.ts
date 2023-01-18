import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlansModule } from './../plans/plans.module';
import { AppMaterialModule } from './../../app-material/app-material.module';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MainHeadingComponent } from './main-heading/main-heading.component';
import { XtractWorksComponent } from './xtract-works/xtract-works.component';
import { XtractUsecasesComponent } from './xtract-usecases/xtract-usecases.component';
import { PrebuiltCarousalComponent } from './prebuilt-carousal/prebuilt-carousal.component';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { PrebuiltCarousalItemComponent } from './prebuilt-carousal-item/prebuilt-carousal-item.component';
import { SharedModule } from '../../shared/shared.module';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';
import { HomepageFooterComponent } from './homepage-footer/homepage-footer.component';
import { LiveActiveUsersComponent } from './live-active-users/live-active-users.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HomeBaseComponent } from './home-base/home-base.component';


@NgModule({
  declarations: [HomeComponent, MainHeadingComponent, XtractWorksComponent, XtractUsecasesComponent, PrebuiltCarousalComponent, PrebuiltCarousalItemComponent, ContactUsFormComponent, HomepageFooterComponent, LiveActiveUsersComponent, PrivacyPolicyComponent, HomeBaseComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule,
    MatCarouselModule.forRoot(),
    PlansModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class HomeModule { }
