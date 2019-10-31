/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, LitElement, html, property, query } from 'lit-element';
import classnames from 'classnames';
import settings from 'carbon-components/es/globals/js/settings';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import styles from './textarea.scss';

const { prefix } = settings;

/**
 * Input element. Supports all the usual attributes for textual input types
 */
@customElement(`${prefix}-textarea`)
export default class BXTextarea extends LitElement {
  /**
   * May be any of the standard HTML autocomplete options
   */
  @property()
  autocomplete = '';

  /**
   * Sets the textarea to be focussed automatically on page load. Defaults to false
   */
  @property({ type: Boolean })
  autofocus = false;

  /**
   * The number of columns for the textarea to show by default
   */
  @property()
  cols = 50;

  /**
   * Controls the disabled state of the textarea
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The helper text. Corresponds to `helper-text` attribute.
   */
  @property({ attribute: 'helper-text' })
  helperText = '';

  /**
   * ID to link the `label` and `textarea`
   */
  @property()
  id = '';

  /**
   * Controls the invalid state and visibility of the `validityMessage`
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * The label text. Corresponds to `label-text` attribute.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * Name for the textarea in the `FormData`
   */
  @property()
  name = '';

  /**
   * Pattern to validate the textarea against for HTML validity checking
   */
  @property()
  pattern = '';

  /**
   * Value to display when the textarea has an empty `value`
   */
  @property({ reflect: true })
  placeholder = '';

  /**
   * Controls the readonly state of the textarea
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Boolean property to set the required status
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * The number of rows for the textarea to show by default
   */
  @property()
  rows = 4;

  /**
   * The validity message. Corresponds to `validity-message` attribute.
   */
  @property({ attribute: 'validity-message' })
  validityMessage = '';

  /**
   * The value of the text area.
   */
  @property()
  set value(v: string) {
    if (this._textarea) {
      this._textarea.value = v;
    }
  }

  get value(): string {
    if (this._textarea) {
      return this._textarea.value;
    }
    return '';
  }

  /**
   * Get a reference to the underlying textarea so we can directly apply values.
   * This lets us fixe a bug where after a user would clear text, the value wouldn't update programmatically
   */
  @query('textarea')
  protected _textarea!: HTMLTextAreaElement;

  render() {
    const invalidIcon = WarningFilled16({ class: `${prefix}--text-area__invalid-icon` });

    const textareaClasses = classnames(`${prefix}--text-area`, `${prefix}--text-area--v2`, {
      [`${prefix}--text-area--invalid`]: this.invalid,
    });

    const labelClasses = classnames(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: this.disabled,
    });

    const helperTextClasses = classnames(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: this.disabled,
    });

    return html`
      <label class="${labelClasses}" for="input">
        <slot name="label-text">
          ${this.labelText}
        </slot>
      </label>
      <div class="${helperTextClasses}">
        <slot name="helper-text">
          ${this.helperText}
        </slot>
      </div>
      <div class="${prefix}--text-area__wrapper" ?data-invalid="${this.invalid}">
        ${this.invalid ? invalidIcon : null}
        <textarea
          ?autocomplete="${this.autocomplete}"
          ?autofocus="${this.autofocus}"
          class="${textareaClasses}"
          cols="${this.cols}"
          ?data-invalid="${this.invalid}"
          ?disabled="${this.disabled}"
          id="input"
          name="${this.name}"
          pattern="${this.pattern}"
          placeholder="${this.placeholder}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          rows="${this.rows}"
        ></textarea>
      </div>
      <div class="${prefix}--form-requirement">
        <slot name="validity-message">
          ${this.validityMessage}
        </slot>
      </div>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}