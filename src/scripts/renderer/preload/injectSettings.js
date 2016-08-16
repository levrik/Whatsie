function _inject () {
  const menuButton = document.querySelector('.menu-item > .icon.icon-menu');
  if (!menuButton) return;

  menuButton.onclick = function () {
    function injectWhatsieSettingsItem () {
      const allSettingsItems = document.querySelectorAll('.drawer.drawer-settings .chat');

      allSettingsItems.forEach((settingsItem) => {
        settingsItem.onclick = () => {
          setTimeout(function () {
            const drawerBackAction = document.querySelector('.drawer-title-action');
            drawerBackAction.onclick = () => {
              setTimeout(() => {
                injectWhatsieSettingsItem();
              });
            };
          });
        };
      });

      const settingsList = document.querySelector('.chatlist.list-settings');

      const helpSettingsItem = settingsList.children[3];

      const whatsieSettingsItem = document.createElement('div');
      whatsieSettingsItem.className = 'chat';
      whatsieSettingsItem.dataset.ignoreCapture = 'any';

      whatsieSettingsItem.onclick = () => {
        const settingsDrawer = document.querySelector('.drawer.drawer-settings');
        settingsDrawer.style.transition = 'transform 250ms cubic-bezier(0,.8,.5,1)';

        const drawerContainer = settingsDrawer.parentNode;

        const whatsieSettingsDrawer = document.createElement('div');
        whatsieSettingsDrawer.className = 'drawer drawer-whatsie-settings';
        whatsieSettingsDrawer.style.transition = 'transform 250ms cubic-bezier(0,.8,.5,1)';
        whatsieSettingsDrawer.style.transform = 'translateX(100%)';

        setTimeout(() => {
          whatsieSettingsDrawer.style.transform = 'translateX(0px)';
          settingsDrawer.style.transform = 'translateX(-100%)';
        });

        const whatsieSettingsDrawerHeader = document.createElement('header');
        whatsieSettingsDrawerHeader.className = 'drawer-header';
        whatsieSettingsDrawer.appendChild(whatsieSettingsDrawerHeader);

        const whatsieSettingsDrawerTitle = document.createElement('div');
        whatsieSettingsDrawerTitle.className = 'pane-header drawer-title';
        whatsieSettingsDrawerTitle.style.padding = '0px';
        whatsieSettingsDrawerTitle.style.opacity = '1';
        whatsieSettingsDrawerTitle.style.transform = 'translateX(0px)';
        whatsieSettingsDrawerTitle.style.backgroundColor = 'transparent';
        whatsieSettingsDrawerHeader.appendChild(whatsieSettingsDrawerTitle);

        const whatsieSettingsDrawerTitleAction = document.createElement('div');
        whatsieSettingsDrawerTitleAction.className = 'drawer-title-action';
        whatsieSettingsDrawerTitleAction.style.textAlign = 'initial';
        whatsieSettingsDrawerTitleAction.style.width = '54px';
        whatsieSettingsDrawerTitle.appendChild(whatsieSettingsDrawerTitleAction);

        const whatsieSettingsDrawerTitleActionIcon = document.createElement('span');
        whatsieSettingsDrawerTitleActionIcon.className = 'icon btn-close-drawer icon-back-light';
        whatsieSettingsDrawerTitleActionIcon.dataset.ignoreCapture = 'any';
        whatsieSettingsDrawerTitleActionIcon.onclick = () => {
          settingsDrawer.style.transform = 'translateX(0px)';
          whatsieSettingsDrawer.style.transform = 'translateX(100%)';
          setTimeout(() => {
            drawerContainer.removeChild(whatsieSettingsDrawer);
            settingsDrawer.style.transition = null;
          }, 250);
        };
        whatsieSettingsDrawerTitleAction.appendChild(whatsieSettingsDrawerTitleActionIcon);

        const whatsieSettingsDrawerTitleBody = document.createElement('span');
        whatsieSettingsDrawerTitleBody.className = 'drawer-title-body';
        whatsieSettingsDrawerTitleBody.style.fontWeight = '500';
        whatsieSettingsDrawerTitleBody.style.fontSize = '19px';
        whatsieSettingsDrawerTitleBody.style.lineHeight = 'normal';
        whatsieSettingsDrawerTitleBody.innerText = 'Whatsie Settings';
        whatsieSettingsDrawerTitle.appendChild(whatsieSettingsDrawerTitleBody);

        const whatsieSettingsDrawerBody = document.createElement('header');
        whatsieSettingsDrawerBody.className = 'drawer-body drawer-body-wide';
        whatsieSettingsDrawer.appendChild(whatsieSettingsDrawerBody);

        const whatsieSettingsDrawerControlsContainer = document.createElement('div');
        whatsieSettingsDrawerControlsContainer.className = 'controls-container drawer-section';
        whatsieSettingsDrawerBody.appendChild(whatsieSettingsDrawerControlsContainer);

        const controls = [
          {type: 'checkbox', label: 'Launch on Startup', checked: true, click: () => console.log('clicked')},
          {type: 'checkbox', label: 'Start Hidden on Startup', checked: false},
          {type: 'checkbox', label: 'Open Links in Browser', checked: true, hint: 'Open links in chats with your default browser'},
          {type: 'dropdown', items: [
            {value: 'default', label: 'Default'},
            {value: 'faded', label: 'Faded'},
            {value: 'pure', label: 'Pure'},
            {value: 'grey', label: 'Grey'},
            {value: 'dark', label: 'Dark'},
            {value: 'numixdark', label: 'Numix Dark'},
            {value: 'shadow', label: 'Shadow'},
            {value: 'sephia', label: 'Sephia'},
            {value: 'fluttershy', label: 'Fluttershy'},
            {value: 'orange', label: 'Orange'}
          ], value: 'default', change: () => console.log('changed')}
        ];

        function createCheckboxControl (controlsSection, label, checked, click, hint) {
          if (click) controlsSection.onclick = click;

          const control = document.createElement('div');
          control.className = 'control';

          const checkboxContainer = document.createElement('div');
          checkboxContainer.className = 'checkbox-container';
          control.appendChild(checkboxContainer);

          const checkbox = document.createElement('div');
          if (checked) checkbox.className = 'checkbox checked';
          else checkbox.className = 'checkbox';
          checkboxContainer.appendChild(checkbox);

          const checkmark = document.createElement('div');
          checkmark.className = 'checkmark';
          checkbox.appendChild(checkmark);

          controlsSection.appendChild(control);

          const labelElem = document.createElement('div');
          labelElem.className = 'label';
          labelElem.innerText = label;

          if (hint) {
            const hintElem = document.createElement('div');
            hintElem.className = 'hint';
            hintElem.innerText = hint;
            labelElem.appendChild(hintElem);
          }

          controlsSection.appendChild(labelElem);
        }

        function createDropdownControl (controlsSection, items, value, change) {
          controlsSection.className += ' controls-section-wide';

          const control = document.createElement('div');
          control.className = 'select';

          const select = document.createElement('select');
          if (change) select.onchange = change;
          control.appendChild(select);

          for (let item of items) {
            let option = document.createElement('option');
            option.value = item.value;
            if (item.value === value) option.selected = true;
            option.innerText = item.label;
            select.appendChild(option);
          }

          controlsSection.appendChild(control);
        }

        for (let control of controls) {
          let controlsSection = document.createElement('div');
          controlsSection.className = 'controls-section';

          switch (control.type) {
            case 'checkbox':
              createCheckboxControl(controlsSection, control.label, control.checked, control.click, control.hint);
              break;
            case 'dropdown':
            case 'select':
              createDropdownControl(controlsSection, control.items, control.value, control.change);
              break;
          }

          whatsieSettingsDrawerControlsContainer.appendChild(controlsSection);
        }

        drawerContainer.insertBefore(whatsieSettingsDrawer, drawerContainer.firstChild);
      };

      const whatsieSettingsItemCell = document.createElement('div');
      whatsieSettingsItemCell.className = 'chat-cell';
      whatsieSettingsItem.appendChild(whatsieSettingsItemCell);

      // ITEM AVATAR

      const whatsieSettingsItemAvatar = document.createElement('div');
      whatsieSettingsItemAvatar.className = 'chat-avatar';
      whatsieSettingsItemCell.appendChild(whatsieSettingsItemAvatar);

      const whatsieSettingsItemAvatarInner = document.createElement('div');
      whatsieSettingsItemAvatarInner.className = 'avatar';
      whatsieSettingsItemAvatar.appendChild(whatsieSettingsItemAvatarInner);

      const whatsieSettingsItemAvatarIcon = document.createElement('span');
      whatsieSettingsItemAvatarIcon.className = 'icon';
      whatsieSettingsItemAvatarIcon.style.backgroundImage = 'none';
      whatsieSettingsItemAvatarInner.appendChild(whatsieSettingsItemAvatarIcon);

      // ITEM BODY

      const whatsieSettingsItemBody = document.createElement('div');
      whatsieSettingsItemBody.className = 'chat-body';
      whatsieSettingsItemCell.appendChild(whatsieSettingsItemBody);

      const whatsieSettingsItemMain = document.createElement('div');
      whatsieSettingsItemMain.className = 'chat-main';
      whatsieSettingsItemBody.appendChild(whatsieSettingsItemMain);

      const whatsieSettingsItemTitle = document.createElement('div');
      whatsieSettingsItemTitle.className = 'chat-title';
      whatsieSettingsItemMain.appendChild(whatsieSettingsItemTitle);

      const whatsieSettingsItemTitleInner = document.createElement('span');
      whatsieSettingsItemTitleInner.className = 'emojitext ellisify';
      whatsieSettingsItemTitleInner.dir = 'auto';
      whatsieSettingsItemTitleInner.innerText = 'Whatsie Settings';
      whatsieSettingsItemTitle.appendChild(whatsieSettingsItemTitleInner);

      settingsList.insertBefore(whatsieSettingsItem, helpSettingsItem);
    }

    setTimeout(() => {
      const settingsItem = document.querySelector('.menu-item.menu-shortcut:nth-child(5)');
      settingsItem.onmouseup = () => {
        setTimeout(() => {
          injectWhatsieSettingsItem();
        });
      };
    });
  };
}

export function inject () {
  const appWrapper = document.querySelector('.app-wrapper');
  if (!appWrapper) {
    // NOTE: do not work if timeout is lower than 1000. Strange...
    setTimeout(() => {
      inject();
    }, 1000);
    return;
  }

  // eslint-disable-next-line no-undef
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        if (mutation.oldValue.indexOf('app-wrapper-main') === -1 && appWrapper.className.indexOf('app-wrapper-main') !== -1) {
          _inject();
        }
      }
    });
  });
  observer.observe(appWrapper, {attributes: true, attributeOldValue: true});

  _inject();
}
