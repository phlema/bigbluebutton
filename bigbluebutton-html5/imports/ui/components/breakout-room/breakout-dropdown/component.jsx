import React, { PureComponent } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { withModalMounter } from '/imports/ui/components/common/modal/service';
import BBBMenu from "/imports/ui/components/common/menu/component";
import CreateBreakoutRoomModal from '/imports/ui/components/actions-bar/create-breakout-room/container';
import Trigger from "/imports/ui/components/common/control-header/right/component";

const intlMessages = defineMessages({
  options: {
    id: 'app.breakout.dropdown.options',
    description: 'Breakout options label',
  },
  manageDuration: {
    id: 'app.breakout.dropdown.manageDuration',
    description: 'Manage duration label',
  },
  manageUsers: {
    id: 'app.breakout.dropdown.manageUsers',
    description: 'Manage users label',
  },
  destroy: {
    id: 'app.breakout.dropdown.destroyAll',
    description: 'Destroy breakouts label',
  },
});

class BreakoutDropdown extends PureComponent {
  constructor(props) {
    super(props);
  }

  getAvailableActions() {
    const {
      intl,
      openBreakoutTimeManager,
      endAllBreakouts,
      isMeteorConnected,
      amIModerator,
      mountModal,
    } = this.props;

    this.menuItems = [];

    this.menuItems.push(
      {
        key: 'breakoutTimeManager',
        dataTest: 'openBreakoutTimeManager',
        label: intl.formatMessage(intlMessages.manageDuration),
        onClick: () => {
          openBreakoutTimeManager();
        }
      }
    );

    this.menuItems.push(
      {
        key: 'updateBreakoutUsers',
        dataTest: 'openUpdateBreakoutUsersModal',
        label: intl.formatMessage(intlMessages.manageUsers),
        onClick: () => {
          mountModal(
            <CreateBreakoutRoomModal isUpdate />
          );
        }
      }
    );

    if (amIModerator) {
      this.menuItems.push(
        {
          key: 'endAllBreakouts',
          dataTest: 'endAllBreakouts',
          label: intl.formatMessage(intlMessages.destroy),
          disabled: !isMeteorConnected,
          onClick: () => {
            endAllBreakouts();
          }
        }
      );
    }

    return this.menuItems;
  }

  render() {
    const {
      intl,
      isRTL,
    } = this.props;

    return (
      <>
        <BBBMenu
          trigger={
            <Trigger
              data-test="breakoutOptionsMenu"
              icon="more"
              label={intl.formatMessage(intlMessages.options)}
              aria-label={intl.formatMessage(intlMessages.options)}
              onClick={() => null}
            />
          }
          opts={{
            id: "breakoutroom-dropdown-menu",
            keepMounted: true,
            transitionDuration: 0,
            elevation: 3,
            getContentAnchorEl: null,
            fullwidth: "true",
            anchorOrigin: { vertical: 'bottom', horizontal: isRTL ? 'right' : 'left' },
            transformOrigin: { vertical: 'top', horizontal: isRTL ? 'right' : 'left' },
          }}
          actions={this.getAvailableActions()}
        />
      </>
    );
  }
}

export default withModalMounter(injectIntl(BreakoutDropdown));
