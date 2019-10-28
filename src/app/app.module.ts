import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopNavBarComponent} from './components/top-nav-bar/top-nav-bar.component';
import {UserSettingsComponent} from './components/top-nav-bar/user-settings/user-settings.component';
import {EventsPageComponent} from './components/events-page/events-page.component';
import {EventDetailComponent} from './components/event-detail/event-detail.component';
import {UserPreferencesComponent} from './components/top-nav-bar/user-settings/user-preferences/user-preferences.component';
import {GeneralInfoComponent} from './components/top-nav-bar/user-settings/general-info/general-info.component';
import {NotificationsComponent} from './components/top-nav-bar/notifications/notifications.component';
import {BottomNavbarComponent} from './components/bottom-navbar/bottom-navbar.component';
import {HomeComponent} from './components/home/home.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {CardComponent} from './components/home/card/card.component';
import {CalendarComponent} from './components/home/calendar/calendar.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {RegisterComponent} from './components/register/register.component';
import {GraphsComponent} from './components/graphs/graphs.component';
import {IonicModule} from '@ionic/angular';
import {AgmCoreModule} from '@agm/core';
import {DiscoverComponent} from './components/discover/discover.component';
import {ProfileComponent} from './components/profile/profile.component';
import {HttpClientInMemoryWebApiModule, InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {DataService} from "./services/data.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

const appRoutes: Routes = [
  {path: 'users/:id/settings', component: UserSettingsComponent, pathMatch: 'full'},
  {path: 'users/:id', component: GeneralInfoComponent, pathMatch: 'full'},
  {path: 'events', component: EventsPageComponent, pathMatch: 'full'},
  {path: 'events/:id', component: EventDetailComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: PageNotFoundComponent, pathMatch: 'full'},
  {path: 'register', component: PageNotFoundComponent, pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent, pathMatch: 'full'},
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
    CalendarComponent,
    SignInComponent,
    RegisterComponent,
    GraphsComponent,
    DiscoverComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService, {dataEncapsulation: false}),
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDh_7kD-kYAlIYjWRXbHZvO6t2UjtFrmNQ',
      }
    ),
    RouterModule.forRoot(appRoutes,
      {enableTracing: true}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
