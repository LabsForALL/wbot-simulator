import { WbotSimulatorPage } from './app.po';

describe('wbot-simulator App', () => {
  let page: WbotSimulatorPage;

  beforeEach(() => {
    page = new WbotSimulatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
