import { action } from '@storybook/addon-actions';
import survey from './assets/surveys/HrAudit.json';
import onePageSurvey from './assets/surveys/HrAuditOnePage.json';
import BambeeSurvey from './BambeeSurvey.vue';

export default {
  title: 'BambeeSurvey',
  component: BambeeSurvey,
  parameters: {
    componentSubtitle: '',
  },
};

const handleInput = action('input');
const handleComplete = action('complete');

export const HrAudit = () => ({
  components: { BambeeSurvey },
  data() {
    return { survey };
  },
  methods: {
    handleInput,
    handleComplete,
  },
  template: `
  <div class="max-w-2xl mx-auto my-4">
    <BambeeSurvey
      :survey="survey"
      @input="handleInput"
      @complete="handleComplete"
    />
  </div>
  `,
});

export const HrAuditWithInitialValues = () => ({
  components: { BambeeSurvey },
  data() {
    return {
      survey,
      initialValues: {
        hasPayrollSolution: false,
        hasPosters: 'no',
        hasPtoPolicy: 'yes',
        hasRemoteWorkers: false,
      },
    };
  },
  methods: {
    handleInput,
    handleComplete,
  },
  template: `
  <div class="max-w-2xl mx-auto my-4">
    <BambeeSurvey
      :survey="survey"
      :initial-values="initialValues"
      @input="handleInput"
      @complete="handleComplete"
    />
  </div>
  `,
});

export const HrAuditOnePage = () => ({
  components: { BambeeSurvey },
  data() {
    return { survey: onePageSurvey };
  },
  methods: {
    handleInput,
    handleComplete,
  },
  template: `
  <div class="max-w-2xl mx-auto my-4">
    <BambeeSurvey
      :survey="survey"
      @input="handleInput"
      @complete="handleComplete"
    />
  </div>
  `,
});

export const HrAuditOnePageWithInitialValues = () => ({
  components: { BambeeSurvey },
  data() {
    return {
      survey: onePageSurvey,
      initialValues: {
        hasPayrollSolution: false,
        hasPosters: 'no',
        hasPtoPolicy: 'yes',
        hasRemoteWorkers: false,
      },
    };
  },
  methods: {
    handleInput,
    handleComplete,
  },
  template: `
  <div class="max-w-2xl mx-auto my-4">
    <BambeeSurvey
      :survey="survey"
      :initial-values="initialValues"
      @input="handleInput"
      @complete="handleComplete"
    />
  </div>
  `,
});
