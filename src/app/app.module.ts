import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { HeaderComponent } from './components/header/header.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventCardComponent } from './components/event-list/event-card/event-card.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { GraphQLModule } from './graphql.module';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { DateSelectComponent } from './components/date-select/date-select.component';
import { SportSelectComponent } from './components/sport-select/sport-select.component';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { BroadcastSelectComponent } from './components/broadcast-select/broadcast-select.component';
import { MenuComponent } from './components/menu/menu.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EventListComponent,
    EventCardComponent,
    DateSelectComponent,
    SportSelectComponent,
    BroadcastSelectComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzRadioModule,
    NzSelectModule,
    NzToolTipModule,
    NzDividerModule,
    NzGridModule,
    NzBadgeModule,
    NzCardModule,
    NzAffixModule,
    NzEmptyModule,
    NzTagModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GraphQLModule
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
