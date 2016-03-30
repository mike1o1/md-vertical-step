import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['md-step'],
  classNameBindings: ['active:active', 'completed', 'hasErrors:invalid'],

  stepNumber: null,

  didInsertElement() {
    this._super(...arguments);

    this._setupStep();
  },

  activeStep: Ember.computed.alias('stepContainer.activeStep'),

  active: Ember.computed('activeStep', function() {

    const sn = this.get('stepNumber'),
      as = this.get('stepContainer.activeStep');

    return sn === as;
  }),

  hasErrors: false,
  completeStep: Ember.K,

  _setupStep() {
    var stepContainer = this.get('stepContainer');
    if (stepContainer) {
      stepContainer.registerStep(this);
    }

    var activeStep = this.get('stepContainer.activeStep');


    if (activeStep !== this.get('stepNumber')) {
      this._shrinkStep(true);
    }
  },

  activateStep: Ember.observer('stepContainer.activeStep', function() {

    let activeStep = this.get('stepContainer.activeStep');

    if (activeStep === this.get('stepNumber')) {
      this._growStep();
      // and scroll to this position

    } else {
      this._shrinkStep();
    }

    return true;

  }),

  _shrinkStep(skipAnimation) {

    const stepContent = this.$('.md-step-content');

    const currentHeight = stepContent.css('height');

    // If already shrunk, don't need to do anything
    if (currentHeight === '0px') {
      return;
    }

    stepContent.css('height', '');
    const targetHeight = stepContent.height();


    stepContent.css('height', `${targetHeight}px`);

    if (skipAnimation) {
      stepContent.css('height', '0px');
    } else {
      stepContent.animate({height: 0}, 500, () => {

      });
    }
  },


  _growStep() {
    const stepContent = this.$('.md-step-content');

    const currentHeight = stepContent.css('height');

    stepContent.addClass('no-transition');
    stepContent.css('height', '');
    const targetHeight = stepContent.height();

    stepContent.css('height', currentHeight);

    stepContent.animate({height: targetHeight}, 500, () => {
      Ember.$('.main-column').animate({scrollTop: this.$()[0].offsetTop - 48}, 400);
      stepContent.css('height', '');
    });

  },

  actions: {
    completeStep() {

      this.completeStep();

      let stepContainer = this.get('stepContainer');

      if (!this.get('hasErrors')) {
        stepContainer.completeStep(this);
      }
    }
  }
});
