import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { io } from "socket.io-client";

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
