import { AppConfig, UserSession } from '@stacks/connect';

export class StxSessionService {

  userSession: UserSession;

  constructor() {
    const appConfig = new AppConfig(['store_write', 'publish_data']);
  // This should be app scoped
    this.userSession = new UserSession({ appConfig });
//    const userSession = new UserSession();
    
  }
}