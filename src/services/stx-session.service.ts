import { AppConfig, UserSession, UserData, showConnect } from '@stacks/connect';

export class StxSessionService {

  public userSession: UserSession;
  public userData: UserData | null = null;

  constructor() {
    const appConfig = new AppConfig(['store_write', 'publish_data']);
  // This should be app scoped
    this.userSession = new UserSession({ appConfig });
//    const userSession = new UserSession();
  }

  public authenticate(cbFunction: any) {
    showConnect({
      appDetails: {
        name: 'PUN',
  //      icon: window.location.origin + '/my-app-logo.svg',
        icon: window.location.origin + '/images/logo.png',
      },
      redirectTo: '/',
      onFinish: () => {
        this.userData = this.userSession.loadUserData();
  //      console.debug("userData: " + JSON.stringify(userData, null, 1));
        cbFunction(this.userData);
        // Save or otherwise utilize userData post-authentication
      },
      userSession: this.userSession,
    });
  }

}