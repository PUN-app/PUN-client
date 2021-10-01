import { AppConfig, UserSession, UserData, showConnect } from '@stacks/connect';

export class StxSessionService {

  public userSession: UserSession;
  public userData: UserData | null = null;

  constructor() {
    // publish_data required to save unencrypted public data
    // (https://docs.stacks.co/build-apps/guides/data-storage)
    //const appConfig = new AppConfig(['store_write'], appDomain);

    const appConfig = new AppConfig(['store_write', 'publish_data']);
  // This should be app scoped
    this.userSession = new UserSession({ appConfig });
//    const userSession = new UserSession();
  }

  public authenticate(cbFunction: any) {
    showConnect({
      appDetails: {
        name: 'PUN',
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
  
  public signUserOut() {
    if (this.userSession && this.userSession.isUserSignedIn()) {
      const result = this.userSession.signUserOut();
      console.debug("logout result: " + result);
    }
  }

  public async encrypt(message: any) {
    let cipherText: String | null = null;
    if (this.userSession && this.userSession.isUserSignedIn()) {
      cipherText = await this.userSession.encryptContent(message);
    }
    return cipherText;
//    const message = 'My secret message';
//    const cipherText = await userSession.encryptContent(message);
//    const plainText = await userSession.decryptContent(cipherText);
  }

}