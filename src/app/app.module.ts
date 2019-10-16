import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { UserSettingsComponent } from './components/top-nav-bar/user-settings/user-settings.component';
import { EventsPageComponent } from './components/events-page/events-page.component';
import { UserPreferencesComponent } from './components/top-nav-bar/user-settings/user-preferences/user-preferences.component';

@NgModule({
  declarations: [
    AppComponent,
    EventDetailComponent,
    TopNavBarComponent,
    UserSettingsComponent,
    EventsPageComponent,
    UserPreferencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
