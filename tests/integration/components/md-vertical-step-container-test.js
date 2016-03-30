import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('md-vertical-step-container', 'Integration | Component | md vertical step container', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{md-vertical-step-container}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#md-vertical-step-container}}
      template block text
    {{/md-vertical-step-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
