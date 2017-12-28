import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModuleNgFactory } from './app/app.module.ngfactory';

platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);
