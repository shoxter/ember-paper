import Ember from 'ember';

const { $, Component, computed, inject } = Ember;

export default Component.extend({
  tagName: '',

  escapeToClose: true,
  focusOnOpen: true,

  // Calculate a default that is always valid for the parent of the backdrop.
  wormholeSelector: '#paper-wormhole',
  defaultedParent: computed.or('parent', 'wormholeSelector'),

  // Calculate a default that is always valid where the opening transition should originate.
  defaultedOpenFrom: computed.or('openFrom', 'origin', 'defaultedParent'),

  // Calculate a default that is always valid where the closing transition should terminate.
  defaultedCloseTo: computed.or('closeTo', 'origin', 'defaultedParent'),

  // Calculate the id of the wormhole destination, setting it if need be. The
  // id is that of the 'parent', if provided, or 'paper-wormhole' if not.
  destinationId: computed('defaultedParent', function() {
    let parent = this.get('defaultedParent');
    let $parent = $(parent);
    // If the parent isn't found, assume that it is an id, but that the DOM doesn't
    // exist yet. This only happens during integration tests or if entire application
    // route is a dialog.
    if ($parent.length === 0 && parent.charAt(0) === '#') {
      return parent.substring(1);
    } else {
      let id = $parent.attr('id');
      if (!id) {
        id = `${this.elementId}-parent`;
        $parent.get(0).id = id;
      }
      return id;
    }
  }),

  constants: inject.service(),

  didInsertElement() {
    if (this.get('escapeToClose')) {
      $(this.get('defaultedParent')).on(`keydown.${this.elementId}`, (e) => {
        if (e.keyCode === this.get('constants.KEYCODE.ESCAPE') && this.get('onClose')) {
          this.get('onClose')();
        }
      });
    }
  },

  willDestroyElement() {
    if (this.get('escapeToClose')) {
      $(this.get('defaultedParent')).off(`keydown.${this.elementId}`);
    }
  },

  actions: {
    outsideClicked() {
      if (this.get('clickOutsideToClose') && this.get('onClose')) {
        this.get('onClose')();
      }
    }
  }
});
