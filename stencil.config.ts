import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 's-monaco-editor',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: '../node_modules/monaco-editor/min/vs/',
          dest: './build/monaco-editor/vs/'
        }
      ],
    },
  ],
};
