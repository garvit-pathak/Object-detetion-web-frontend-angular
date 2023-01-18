import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-footer',
  templateUrl: './homepage-footer.component.html',
  styleUrls: ['./homepage-footer.component.scss']
})
export class HomepageFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const node = document.createElement( 'script' );
    node.src = 'https://seal.godaddy.com/getSeal?sealID=4i6hHRQOdMCEEJlDMD7USPeRGDPC565GWHRDN2J7IU3GjyhpkVGCx3R1s87h';
    node.type = 'text/javascript';
    node.async = true;
    document.getElementById( 'siteseal' ).appendChild( node );
  }

}
