document.querySelector('.menu-item > .icon.icon-menu').onclick = function () {
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
      whatsieSettingsDrawerBody.className = 'drawer-body';
      whatsieSettingsDrawer.appendChild(whatsieSettingsDrawerBody);

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
    whatsieSettingsItemAvatarIcon.className = 'icon icon-settings-help';
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
