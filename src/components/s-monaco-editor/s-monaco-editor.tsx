import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import monacoLoader, { Monaco } from '@monaco-editor/loader';
import { editor } from 'monaco-editor';

@Component({
  tag: 's-monaco-editor',
  styleUrl: 's-monaco-editor.css',
  scoped: true,
})
export class SMonacoEditor {

  private monaco: Monaco;
  private editorContainer: HTMLDivElement;
  private editor: editor.IStandaloneCodeEditor;

  @Prop() monacoVsPath: string;
  @Prop() value: string;
  @Prop() language: string;
  @Prop() theme: string;
  @Prop() readOnly: boolean = false;

  @Event() componentLoad: EventEmitter<{ monaco: Monaco, editor: editor.IStandaloneCodeEditor }>;
  @Event() didChangeModelContent: EventEmitter<editor.IModelContentChangedEvent>;

  async componentDidLoad() {
    if (this.monaco) {
      monacoLoader.config({
        paths: {
          vs: this.monacoVsPath
        }
      });
    }
    this.monaco = await monacoLoader.init();
    this.editor = this.monaco.editor.create(this.editorContainer, {
      value: this.value,
      language: this.language,
      theme: this.theme,
      readOnly: this.readOnly,
      automaticLayout: true
    });
    this.editor.onDidChangeModelContent(event => {
      this.value = this.editor.getValue();
      this.didChangeModelContent.emit(event);
    });

    this.componentLoad.emit({
      monaco: this.monaco,
      editor: this.editor
    });
  }

  componentShouldUpdate(newValue: any, _oldValue: any, propName: string) {
    switch (propName) {
      case 'value':
        if (newValue !== this.editor.getValue()) {
          this.editor.setValue(newValue);
        }
        break;
      case 'language':
        this.monaco.editor.setModelLanguage(this.editor.getModel(), newValue);
        break;
      default:
        const updatedOption = {};
        updatedOption[propName] = newValue;
        this.editor.updateOptions(updatedOption);
        break;
    }
    return false;
  }

  render() {
    return (
      <Host>
        <div
          id="editor-container"
          ref={el => this.editorContainer = el}
        ></div>
      </Host>
    );
  }

}
