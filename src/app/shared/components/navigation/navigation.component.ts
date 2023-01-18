import {  Router,  RoutesRecognized } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable  } from 'rxjs';
import { map, shareReplay} from 'rxjs/operators';
import { AuthService, ModelService, ProjectService, UserService } from '../../services';
import { Model, User } from '../../models';
import {MatSnackBar} from '@angular/material/snack-bar'
import { NotificationBannerComponent } from '../notification-banner/notification-banner.component';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  currentProject$;
  currentModel$: Observable<Model>;
  currentUser$: Observable<User>
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private projectService: ProjectService,
    private modelService: ModelService,
    private userService: UserService,
    public snackBar: MatSnackBar
  ) {


  }

  ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser
    this.authService.isLoggedIn().subscribe((loggedIn: boolean)=>{
      if(loggedIn){
        this.userService.setUser()
      }
    })
    

    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {

        if(val.state.root.firstChild.params.projectId){
            this.projectService.setProject(val.state.root.firstChild.params.projectId)
            this.currentProject$ = this.projectService.currentProject;
          

            if(val.state.root.firstChild.firstChild.params.modelId){
              this.modelService.setModel(val.state.root.firstChild.params.projectId,val.state.root.firstChild.firstChild.params.modelId)
              this.currentModel$ = this.modelService.currentModel;
           

            }
            
              else{
              this.modelService.removeModel()
            }


          }
          else {
            this.projectService.removeProject()
          }
      }

  });
  // console.log('nav', this.modelId);
  
  }
  // openSnackBar() {
  //   this.snackBar.open('Hi there');
  // }
  openSnackBar() {
    this.snackBar.openFromComponent(NotificationBannerComponent, 
      // {
      // duration: 4000,
      // }
    );
  }
  displayAddImage(link){


  }
  logout() {
    this.authService.logout();
  }
}
