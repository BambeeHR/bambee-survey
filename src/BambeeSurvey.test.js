import { mount } from '@vue/test-utils';
import BambeeSurvey from './BambeeSurvey.vue';
import survey from './assets/surveys/HrAudit.json';

describe('BambeeSurvey', () => {
  describe('component', () => {
    test('renders correctly', () => {
      const wrapper = mount(BambeeSurvey, { propsData: { survey } });
      expect(wrapper).toMatchSnapshot();
    });

    test('emits an input event when data changes', async () => {
      const wrapper = mount(BambeeSurvey, { propsData: { survey } });
      wrapper.vm.$data.model.setValue('hasRemoteWorkers', true);

      expect(wrapper.emitted().input[0][1]).toEqual(
        expect.objectContaining({
          name: 'hasRemoteWorkers',
          value: true,
        })
      );
    });
    // TODO(jon.jandoc): Need to add test coverage for the complete event.

    test.skip('advances to most recent page when passing initial values', () => {
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
