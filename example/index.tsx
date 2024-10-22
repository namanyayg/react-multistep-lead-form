import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactMultistepLeadForm } from '../src';

const App = () => {
  return (
    <div>
      <ReactMultistepLeadForm
        onComplete={() => {}}
        apiUrl="https://api.example.com/submit-lead"
        lookingForOptions={['Option 1', 'Option 2', 'Option 3']}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
