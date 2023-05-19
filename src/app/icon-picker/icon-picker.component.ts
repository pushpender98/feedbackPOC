import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent implements OnInit {
  icons: any;

  constructor(private library: FaIconLibrary) {
    
  }

  ngOnInit(): void {
    // this.icons = this.library.addIconPacks(fas);
    console.log(this.icons)

  }

}
