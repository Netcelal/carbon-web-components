/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './inline-loading-story';

export { default } from './inline-loading-story';

export const Default = args => ({
  template: `
    <bx-inline-loading :status="status">Loading data...</bx-inline-loading>
  `,
  ...createVueBindingsFromProps(args?.['bx-inline-loading']),
});

Object.assign(Default, baseDefault);
