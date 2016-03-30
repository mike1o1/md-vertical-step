import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'md-step-label',
  attributeBindings: ['step.stepNumber:stepindex'],


  displayOptionalText: Ember.computed('optionalText', 'hasErrors', function() {
    let hasErrors = this.get('hasErrors'),
      optionalText = this.get('optionalText');

    if (Ember.isEmpty(optionalText)) {
      return false;
    }

    return !hasErrors;

  }),

  displayErrorText: Ember.computed('step.hasErrors', 'step.completed', 'step.active', function() {
    let completed = this.get('step.completed'),
      active = this.get('step.active'),
      hasErrors = this.get('step.hasErrors');

    if (completed && hasErrors && !active) {
      return true;
    }

    return false;
  }),

  actions: {
    activateStep() {
      if (this.get('step.completed')) {
        let sc = this.get('step.stepContainer');
        sc.activateStep(this.get('step'));
      } else {
        console.log('step not completed');
      }
    }
  }
});
