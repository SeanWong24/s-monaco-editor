import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 's-monaco-editor',
  styleUrl: 's-monaco-editor.css',
  shadow: true,
})
export class SMonacoEditor {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
