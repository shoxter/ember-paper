import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  actions: {
    toggleExpandedItem(value, ev) {
      if (this.get('expandedItem') === value) {
        value = null;
      }
      this.set('expandedItem', value);
      ev.stopPropagation();
    }
  },

  expandedItem: computed('currentRouteName', function() {
    if (this.get('currentRouteName').startsWith('layout')) {
      return 'layout';
    } else {
      return 'demos';
    }
  }),

  demosExpanded: computed.equal('expandedItem', 'demos'),
  layoutExpanded: computed.equal('expandedItem', 'layout')
});
