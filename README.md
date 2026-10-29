# CognitoReader
Cognito Reader — Chrome / Opera extension v1.2.0

INSTALL
1. Extract Cognito_Reader_Chrome_Extension.zip.
2. Open chrome://extensions in Chrome.
3. Turn on Developer mode (top right).
4. Click Load unpacked.
5. Select the cognito-reader-extension folder containing manifest.json.
6. Refresh your Cognito page.

WHAT IT DOES
Automatically applies the console changes on https://cognito.org/:
- Removes CSS blur, including from the bottom note boxes.
- Enables text selection.
- Removes inert attributes and handles dynamically added content.
- Hides the identified "Weekly limit reached" panel and its associated
  full-screen backdrop; releases its scroll lock.
- Also hides the "Sign up to keep reading" panel, including when it is
  dynamically inserted or its heading changes.
- Includes the original open-book icon at 16, 32, 48, 64 and 128 pixels.

It runs locally, sends no data, uses no remote code, and has no analytics.
It applies across Cognito pages and also removes decorative blur.
It does not change server-side account permissions, enable disabled account
features. Sign-up pages and unrelated notices are not targeted.
