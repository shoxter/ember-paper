/* jshint node: true */
'use strict';

var path = require('path');
var autoprefixer = require('broccoli-autoprefixer');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var AngularScssFilter = require('./lib/angular-scss-filter');

module.exports = {
  name: 'ember-paper',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/hammerjs/hammer.js');
    app.import(app.bowerDirectory + '/matchMedia/matchMedia.js');
    app.import('vendor/propagating.js');
  },

  contentFor: function(type) {
    if (type === 'head') {
      return '<div id="paper-wormhole"></div>';
    }
  },

  treeForStyles: function(tree) {
    var scssFiles = [
      'core/style/typography.scss'
    ];

    var angularScssFiles = new Funnel('node_modules/angular-material-source/src', {
      files: scssFiles,
      destDir: 'angular-material'
    });

    angularScssFiles = new AngularScssFilter(angularScssFiles, {
      annotation: 'AngularScssFilter'
    });

    return this._super.treeForStyles(mergeTrees([angularScssFiles, tree], { overwrite: true }));
  },

  postprocessTree: function(type, tree) {
    if (type === 'all' || type === 'styles') {
      tree = autoprefixer(tree, { browsers: ['last 2 versions'] });
    }
    return tree;
  }
};
