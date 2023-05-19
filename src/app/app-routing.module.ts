import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { IconPickerComponent } from './icon-picker/icon-picker.component';

const routes: Routes = [
  { path: '', component: FeedbackComponent },
  { path: 'icons', component: IconPickerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
