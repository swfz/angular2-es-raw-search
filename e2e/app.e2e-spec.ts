import { EsLogSearchPage } from './app.po';

describe('es-log-search App', function() {
  let page: EsLogSearchPage;

  beforeEach(() => {
    page = new EsLogSearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
