import { EdforaPage } from './app.po';

describe('edfora App', () => {
  let page: EdforaPage;

  beforeEach(() => {
    page = new EdforaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
