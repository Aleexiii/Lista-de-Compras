import { ApplicationConfig, provideZoneChangeDetection, inject, PLATFORM_ID } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Provider } from '@angular/core';

/*export function provideAuth0Config() {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    return provideAuth0({
      domain: 'dev-c8x6ikxk0t5b63os.us.auth0.com',
      clientId: 'uYzDTnR63rjbk0jcwrh6CQuugmEQjlKQ',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-c8x6ikxk0t5b63os.us.auth0.com/api/v2/',
        scope: 'openid profile email offline_access'
      },
      useRefreshTokens: true,
      cacheLocation: 'localstorage'
    });
  }
  return [];
};*/

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideHttpClient(withFetch()),

    {
      provide: provideAuth0,
      useFactory: (platformId: Object) => {
        if (isPlatformBrowser(platformId)) {
          return importProvidersFrom(AuthModule.forRoot({
            domain: 'dev-c8x6ikxk0t5b63os.us.auth0.com',
            clientId: 'uYzDTnR63rjbk0jcwrh6CQuugmEQjlKQ',
            authorizationParams: {
              redirect_uri: window.location.origin,
              audience: 'https://dev-c8x6ikxk0t5b63os.us.auth0.com/api/v2/',
              scope: 'openid profile email offline_access'
            },
            useRefreshTokens: true,
            cacheLocation: 'localstorage'
          }));
        }
        return [];
      },
      deps: [PLATFORM_ID]
    }
    //provideAuth0Config()
    /*...(isPlatformBrowser(inject(PLATFORM_ID))
      ? [
        provideAuth0({
          domain: 'dev-c8x6ikxk0t5b63os.us.auth0.com',
          clientId: 'uYzDTnR63rjbk0jcwrh6CQuugmEQjlKQ',
          authorizationParams: {
            redirect_uri: window.location.origin,
            audience: 'https://dev-c8x6ikxk0t5b63os.us.auth0.com/api/v2/',
            scope: 'openid profile email offline_access'
          },
          useRefreshTokens: true,
          cacheLocation: 'localstorage'
        })
      ]
    : [])*/
  ]
};
function importProvidersFrom(arg0: any) {
  throw new Error('Function not implemented.');
}

