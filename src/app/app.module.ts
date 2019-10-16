import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { UserSettingsComponent } from './components/top-nav-bar/user-settings/user-settings.component';
import { EventsPageComponent } from './components/events-page/events-page.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { UserPreferencesComponent } from './components/top-nav-bar/user-settings/user-preferences/user-preferences.component';
import { GeneralInfoComponent } from './components/top-nav-bar/user-settings/general-info/general-info.component';
import { NotificationsComponent } from './components/top-nav-bar/notifications/notifications.component';
import { BottomNavbarComponent } from './components/bottom-navbar/bottom-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CardComponent } from './components/home/card/card.component';
import { CalendarComponent } from './components/home/calendar/calendar.component';

const appRoutes: Routes =  [
    {path: 'users/:id/settings', component: UserSettingsComponent},
    {path: 'users/:id', component: GeneralInfoComponent},
    {path: 'events/:id', component: EventDetailComponent},
    {path: 'events/', component: EventsPageComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: PageNotFoundComponent},
    {path: 'register', component: PageNotFoundComponent},
    {path: '**', component: PageNotFoundComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    EventDetailComponent,
    TopNavBarComponent,
    UserSettingsComponent,
    EventsPageComponent,
    UserPreferencesComponent,
    HomeComponent,
    GeneralInfoComponent,
    NotificationsComponent,
    BottomNavbarComponent,
    PageNotFoundComponent,
    CardComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes,
                         {enableTracing: true}
                        ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
