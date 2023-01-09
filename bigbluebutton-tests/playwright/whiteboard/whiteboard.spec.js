const { test } = require('@playwright/test');
const { Draw } = require('./draw');
const { DrawRectangle } = require('./drawRectangle');
const { DrawEllipse } = require('./drawEllipse');
const { DrawTriangle } = require('./drawTriangle');
const { DrawLine } = require('./drawLine');
const { MultiUsers } = require('../user/multiusers');
const { CUSTOM_MEETING_ID } = require('../core/constants');
const { encodeCustomParams } = require('../customparameters/util');

test.describe.parallel('Whiteboard @ci', () => {
  test('Draw rectangle', async ({ browser, page }) => {
    const draw = new Draw(browser, page);
    await draw.init(true, true);
    await draw.test();
  })

  test('Give Additional Whiteboard Access', async ({ browser, context, page }) => {
    const multiusers = new MultiUsers(browser, context);
    await multiusers.initPages(page);
    await multiusers.whiteboardAccess();
  });
});

test.describe.parallel('Drawing - visual regression', () => {
  test.beforeEach(({ browserName }) => {
    test.skip(browserName !== 'chromium',
      'Drawing visual regression tests are enabled for Chromium only');
  });

  test('Draw rectangle', async ({ browser, context, page }) => {
    const drawRectangle = new DrawRectangle(browser, context);
    await drawRectangle.initModPage(page, true, { customMeetingId: 'draw_rectangle_meeting', customParameter: encodeCustomParams(`userdata-bbb_custom_style=.presentationUploaderToast{display: none;}.currentPresentationToast{display:none;}`) });
    await drawRectangle.initModPage2(true, context, { customParameter: encodeCustomParams(`userdata-bbb_custom_style=.presentationUploaderToast{display: none;}.currentPresentationToast{display:none;}`) });
    await drawRectangle.test();
  });

  test('Draw ellipse', async ({ browser, context, page }) => {
    const drawEllipse = new DrawEllipse(browser, context);
    await drawEllipse.initModPage(page, true, { customMeetingId: 'draw_ellipse_meeting', customParameter: encodeCustomParams(`userdata-bbb_custom_style=.presentationUploaderToast{display: none;}.currentPresentationToast{display:none;}`) });
    await drawEllipse.initModPage2(true, context, { customParameter: encodeCustomParams(`userdata-bbb_custom_style=.presentationUploaderToast{display: none;}.currentPresentationToast{display:none;}`) });
    await drawEllipse.test();
  });

  test('Draw triangle', async ({ browser, context, page }) => {
    const drawTriangle = new DrawTriangle(browser, context);
    await drawTriangle.initModPage(page, true, { customMeetingId: 'draw_triangle_meeting', customParameter: encodeCustomParams(`userdata-bbb_custom_style=.presentationUploaderToast{display: none;}.currentPresentationToast{display:none;}`) });
    await drawTriangle.initModPage2(true, context, { customParameter: encodeCustomParams(`userdata-bbb_custom_style=.presentationUploaderToast{display: none;}.currentPresentationToast{display:none;}`) });
    await drawTriangle.test();
  });

  test('Draw line', async ({ browser, context, page }) => {
    const drawLine = new DrawLine(browser, context);
    await drawLine.initModPage(page, true, { customMeetingId: 'draw_line_meeting', customParameter: encodeCustomParams(`userdata-bbb_custom_style=.presentationUploaderToast{display: none;}.currentPresentationToast{display:none;}`) });
    await drawLine.initModPage2(true, context, { customParameter: encodeCustomParams(`userdata-bbb_custom_style=.presentationUploaderToast{display: none;}.currentPresentationToast{display:none;}`) });
    await drawLine.test();
  });
});
