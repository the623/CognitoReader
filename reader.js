(() => {
  'use strict';

  function enableInteraction(root) {
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    if (root.nodeType === 1 && root.hasAttribute('inert')) {
      root.removeAttribute('inert');
    }
    root.querySelectorAll('[inert]').forEach(element => {
      element.removeAttribute('inert');
    });
  }

  function dismissNotices() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, [role="heading"]');
    for (const heading of headings) {
      const title = heading.textContent.replace(/\s+/g, ' ').trim();
      if (!/^(weekly limit reached|sign up to keep reading)[.!]?$/i.test(title)) continue;
      const panel = heading.closest('[role="dialog"], [role="alertdialog"]')
        || heading.closest('section');
      if (!panel || panel.hasAttribute('data-cognito-reader-dismissed')) continue;

      // Restrict dismissal to the identified limit or reading sign-up panel.
      panel.setAttribute('data-cognito-reader-dismissed', '');
      let wrapper = panel;
      for (let depth = 0; depth < 4 && wrapper.parentElement
        && wrapper.parentElement !== document.body; depth++) {
        const parent = wrapper.parentElement;
        for (const sibling of parent.children) {
          if (sibling === wrapper || sibling.textContent.trim()) continue;
          const box = sibling.getBoundingClientRect();
          if (getComputedStyle(sibling).position === 'fixed'
            && box.width >= innerWidth * 0.8 && box.height >= innerHeight * 0.8) {
            sibling.setAttribute('data-cognito-reader-dismissed', '');
          }
        }
        // A fixed, panel-only wrapper can itself intercept clicks.
        if (getComputedStyle(parent).position === 'fixed'
          && parent.textContent.trim() === panel.textContent.trim()) {
          parent.setAttribute('data-cognito-reader-dismissed', '');
        }
        wrapper = parent;
      }

      for (const element of [document.body, document.documentElement]) {
        if (!element) continue;
        element.removeAttribute('data-scroll-locked');
        for (const property of ['overflow', 'overflow-y', 'pointer-events']) {
          const value = element.style.getPropertyValue(property);
          if (value === 'hidden' || value === 'clip' || value === 'none') {
            element.style.removeProperty(property);
          }
        }
      }
    }
  }

  enableInteraction(document);
  dismissNotices();

  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'attributes') {
        if (record.target.hasAttribute('inert')) {
          record.target.removeAttribute('inert');
        }
      } else if (record.type === 'childList') {
        record.addedNodes.forEach(enableInteraction);
      }
    }
    dismissNotices();
  }).observe(document, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['inert']
  });
})();
