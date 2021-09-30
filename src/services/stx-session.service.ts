import { AppConfig, UserSession, showConnect } from '@stacks/connect';

export class StxSessionService {

  public userSession: UserSession;

  constructor() {
    const appConfig = new AppConfig(['store_write', 'publish_data']);
  // This should be app scoped
    this.userSession = new UserSession({ appConfig });
//    const userSession = new UserSession();
  }

  public authenticate(cbFunction: any, userSession: any) {
    showConnect({
      appDetails: {
        name: 'PUN',
  //      icon: window.location.origin + '/my-app-logo.svg',
        icon: window.location.origin + '/images/logo.png',
      },
      redirectTo: '/',
      onFinish: () => {
        const userData = userSession.loadUserData();
  //      console.debug("userData: " + JSON.stringify(userData, null, 1));
        cbFunction(userData);
        // Save or otherwise utilize userData post-authentication
      },
      userSession: userSession,
    });
  }

}