import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { UserSettingsComponent } from './components/top-nav-bar/user-settings/user-settings.component';
import { EventsPageComponent } from './components/events-page/events-page.component';
import { UserPreferencesComponent } from './components/top-nav-bar/user-settings/user-preferences/user-preferences.component';
import { BottomNavbarComponent } from './components/bottom-navbar/bottom-navbar.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    EventDetailComponent,
    TopNavBarComponent,
    UserSettingsComponent,
    EventsPageComponent,
    UserPreferencesComponent,
    BottomNavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
