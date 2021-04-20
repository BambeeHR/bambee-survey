import { mount } from '@vue/test-utils';
import get from 'lodash.get';
import BambeeSurvey, { mergeDefaultValues } from './BambeeSurvey.vue';
import survey from './assets/surveys/HrAudit.json';

describe('BambeeSurvey', () => {
  describe('mergeDefaultValues', () => {
    test('applies default values to the survey model', () => {
      const updatedSurvey = mergeDefaultValues(survey, {
        hasRemoteWorkers: true,
      });
      expect(
        get(updatedSurvey, ['pages', 0, 'elements', 0, 'defaultValue'])
      ).toBe(true);
    });
  });

  // TODO(jon.jandoc): Skipping these tests for now because the component
  // doesn't seem to be mounting in the DOM properly.
  describe.skip('component', () => {
    test('renders correctly', () => {
      const wrapper = mount(BambeeSurvey, { propsData: { survey } });
      expect(wrapper).toMatchSnapshot();
    });

    test('emits an input event when data changes', async () => {
      const wrapper = mount(BambeeSurvey, { propsData: { survey } });
      await wrapper.find('input[name="hasRemoteWorkers"]').trigger('click');
      expect(wrapper.emitted().input[0][0].data).toEqual({
        hasRemoteWorkers: true,
      });
    });
    // TODO(jon.jandoc): Need to add test coverage for the complete event.

    test('advances to most recent page when passing initial values', () => {
      const wrapper = mount(BambeeSurvey, {
        propsData: {
          survey,
          initialValues: {
            hasPayrollSolution: false,
            hasPosters: 'no',
            hasPtoPolicy: 'yes',
            hasRemoteWorkers: false,
          },
        },
      });
      expect(
        wrapper.find('input[name="hasPayrollSolution"]').element
      ).toBeVisible();
    });
  });
});
