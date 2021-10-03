<template>
  <SurveyComponent :survey="model" class="base-survey" />
</template>

<script>
import * as SurveyVue from 'survey-vue';
import cloneDeep from 'lodash.clonedeep';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config';
import 'survey-vue/survey.css';

const { theme } = resolveConfig(tailwindConfig);

const SurveyComponent = SurveyVue.Survey;

export default {
  components: { SurveyComponent },
  props: {
    survey: {
      type: Object,
      required: true,
    },
    initialValues: {
      type: Object,
      default: () => ({}),
    },
    mode: {
      type: String,
      default: 'edit',
    },
  },
  data() {
    const json = cloneDeep(this.survey);
    const model = new SurveyVue.Model(json);
    model.mergeData(this.initialValues);

    return { model };
  },
  created() {
    this.model.onValueChanged.add((sender, options) => {
      this.$emit('input', sender, options);
    });

    this.model.onComplete.add((sender) => {
      this.$emit('complete', sender);
    });

    this.model.onCompleting.add((sender) => {
      this.$emit('completing', sender);
    });

    if (this.mode === 'display') {
      this.model.mode = 'display';
    }

    const defaultThemeColors = SurveyVue.StylesManager.ThemeColors.default;
    defaultThemeColors['$border-color'] = theme.colors.gray['5'];
    defaultThemeColors['$body-container-background-color'] =
      theme.colors.gray['7'];
    defaultThemeColors['$disable-color'] = theme.colors.black;
    defaultThemeColors['$disabled-label-color'] = theme.colors.gray['3'];
    defaultThemeColors['$disabled-switch-color'] = 'rgba(72, 29, 115, 0.5)';
    defaultThemeColors['$disabled-slider-color'] = theme.colors.white;
    defaultThemeColors['$error-background-color'] = theme.colors['error-light'];
    defaultThemeColors['$error-color'] = theme.colors.error;
    defaultThemeColors['$inputs-background-color'] = theme.colors.white;
    defaultThemeColors['$main-color'] = theme.colors.primary;
    defaultThemeColors['$main-hover-color'] = theme.colors['primary-tint']['1'];
    defaultThemeColors['$slider-color'] = theme.colors.white;
    defaultThemeColors['$text-color'] = theme.colors.black;
    SurveyVue.StylesManager.applyTheme();

    this.model.css = {
      checkbox: {
        itemDecorator: 'sv-svg',
      },
    };

    // Other possible theme values to be declared:
    // $header-background-color: "#e7e7e7"
    // $header-color: "#6d7072"
    // $progress-text-color: "#9d9d9d"
  },
};
</script>

<style>
.base-survey.sv_main {
  @apply font-body-medium font-sans;
}

.base-survey.sv_main .sv_body {
  @apply border-none p-0;
}

.base-survey.sv_main input[type='button'],
.base-survey.sv_main button {
  @apply duration-ludicrous
    ease-out
    font-semibold
    px-4
    h-8
    rounded
    text-14
    transition-all;
}

.base-survey.sv_main
  .sv_body
  .sv_p_root
  .sv_q
  input:not([type='button']):not([type='reset']):not([type='submit']):not([type='image']):not([type='checkbox']):not([type='radio']):hover,
.base-survey.sv_main textarea:hover {
  @apply border-gray-3;
}

.base-survey.sv_main .sv-boolean__switch {
  @apply duration-light
    ease-out
    inline-flex
    items-center
    mx-2
    transition-colors
    w-12;
}

.base-survey.sv_main .sv-boolean--indeterminate .sv-boolean__switch {
  @apply bg-gray-4;
}

.base-survey.sv_main textarea:focus,
.base-survey.sv_main .sv-boolean input:focus ~ .sv-boolean__switch,
.base-survey.sv_main input[type='text']:focus,
.base-survey.sv_main input[type='button']:focus,
.base-survey.sv_main button:focus {
  @apply outline-none shadow-none border-primary;
}

.base-survey.sv_main .sv_container .sv_body .sv_p_root .sv_q textarea {
  @apply appearance-none font-body-text font-sans p-4;
}

.base-survey.sv_main
  .sv_q_erbox:not([style*='display: none']):not([style*='display:none']) {
  @apply bg-error-light border-none p-4 rounded-md text-error;
}

.base-survey.sv_main .sv-boolean__slider {
  @apply h-4 w-4;
}

.base-survey.sv_main .sv-boolean--indeterminate .sv-boolean__slider {
  margin-left: calc(50% - 8px);
}

.base-survey.sv_main .sv-boolean--checked .sv-boolean__slider {
  margin-left: calc(100% - 16px);
}

.base-survey.sv_main .sv_container .sv_body .sv_p_root .sv_q {
  @apply px-6 py-4;
}

.base-survey.sv_main input[type='radio'] {
  @apply sr-only;
}

.base-survey.sv_main .sv_q_radiogroup_label .circle {
  @apply align-middle
    border
    border-gray-4
    border-solid
    box-border
    h-6
    inline-flex
    items-center
    justify-center
    mr-4
    relative
    rounded-full
    w-6;
}

.base-survey.sv_main .sv_q_radiogroup_label .circle svg {
  @apply hidden;
}

.base-survey.sv_main .checked .sv_q_radiogroup_label .circle {
  @apply border-2 border-primary;
}

.base-survey.sv_main .checked .sv_q_radiogroup_label .circle::before {
  @apply absolute bg-primary block h-0 rounded-full w-1/2;
  content: '';
  padding-top: 50%;
}

.base-survey.sv_main .sv_body .sv_p_root .sv_q input[type='checkbox'] {
  @apply hidden;
}

.base-survey.sv_main .sv_body .sv_q_checkbox .sv_q_checkbox_label {
  @apply relative flex items-center;
}

.base-survey.sv_main .sv_body .sv_q_checkbox {
  @apply mb-2;
}

.base-survey.sv_main .sv_body .sv_q_checkbox:last-child {
  @apply mb-0 !important;
}

.base-survey.sv_main .sv_body .sv_q_checkbox .form-group {
  @apply mt-4;
}

.base-survey.sv_main
  .sv_body
  .sv_q_checkbox
  .sv_q_checkbox_label
  > span:last-child {
  @apply leading-6 pl-10;
}

.base-survey.sv_main
  .sv_body
  .sv_q_checkbox
  .sv_q_checkbox_label
  .checkbox-material {
  @apply absolute left-0 w-6 h-6 flex items-center justify-center bg-white text-white border border-solid border-gray-4 rounded-md;
}

.base-survey.sv_main
  .sv_body
  .sv_q_checkbox
  .sv_q_checkbox_label
  .checkbox-material
  .sv-svg {
  @apply w-6 h-6 text-white fill-current;
}

.base-survey.sv_main
  .sv_body
  .sv_q_checkbox.checked
  .sv_q_checkbox_label
  .checkbox-material {
  @apply bg-primary border-primary;
}
</style>
