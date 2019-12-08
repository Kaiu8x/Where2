import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

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
// import {SignInComponent} from './components/sign-in/sign-in.component';
// import {RegisterComponent} from './components/register/register.component';
import {GraphsComponent} from './components/graphs/graphs.component';
import {IonicModule} from '@ionic/angular';
import {AgmCoreModule} from '@agm/core';
import {DiscoverComponent} from './components/discover/discover.component';
import {ProfileComponent} from './components/profile/profile.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FilterOnIdPipe} from "./components/event-detail/Aux";

const appRoutes: Routes = [
  {path: 'users/:id/settings', component: UserSettingsComponent},
  {path: 'users/:id', component: GeneralInfoComponent},
  {path: 'events/create', component: EventFormComponent},
  {path: 'events/edit/:id', component: EventFormComponent},
  {path: 'events/:id', component: EventDetailComponent},
  {path: 'events', component: EventsPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'discover', component: DiscoverComponent},
  {path: 'profile', component: ProfileComponent},
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
    CalendarComponent,
    // SignInComponent,
    // RegisterComponent,
    GraphsComponent,
    DiscoverComponent,
    ProfileComponent,
    EventFormComponent,
    FilterOnIdPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes,
      {enableTracing: true}
    ),
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
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDh_7kD-kYAlIYjWRXbHZvO6t2UjtFrmNQ',
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
