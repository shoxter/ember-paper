var Filter = require('broccoli-filter');

function AngularScssFilter(inputNode, options) {
  Filter.call(this, inputNode, {
    annotation: options.annotation
  });
}

AngularScssFilter.prototype = Object.create(Filter.prototype);
AngularScssFilter.prototype.constructor = AngularScssFilter;
AngularScssFilter.prototype.extensions = ['scss'];
AngularScssFilter.prototype.targetExtension = 'scss';

AngularScssFilter.prototype.processString = function(content, relativePath) {
  console.log('Filtering `' + relativePath + '`...');
  return content;
};

module.exports = AngularScssFilter;
