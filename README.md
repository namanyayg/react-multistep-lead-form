# React Multistep Lead Form

Create _high converting_ lead capture forms with multiple steps

Problem: Most lead capture forms have a single step. This is a problem because it means that the user has to fill out the form in one go. If they don't complete the form in one go, they have to start over.

Solution: Create lead capture forms with multiple steps, and keep sending the state of the form to the backend. This allows the user to complete the form in multiple parts.

## Configuration

The `ReactMultistepLeadForm` component accepts the following props:

| Prop                | Type         | Description                                                   | Default                                                                                                                                                   |
| ------------------- | ------------ | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onComplete`        | `() => void` | Function to call when the form is completed                   | Required                                                                                                                                                  |
| `apiUrl`            | `string`     | URL to submit form data to                                    | Required                                                                                                                                                  |
| `lookingForOptions` | `string[]`   | Array of options for the "What are you looking for?" dropdown | Required                                                                                                                                                  |
| `className`         | `string`     | CSS class for the form container                              | `"bg-transparent-white backdrop-blur-md rounded-lg p-8"`                                                                                                  |
| `inputClassName`    | `string`     | CSS class for input fields                                    | `"w-full px-3 py-2 bg-transparent-white backdrop-blur-md text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"` |
| `labelClassName`    | `string`     | CSS class for labels                                          | `"block text-white font-medium mb-2"`                                                                                                                     |
| `buttonClassName`   | `string`     | CSS class for buttons                                         | `"w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"`                                         |
| `errorClassName`    | `string`     | CSS class for error messages                                  | `"text-red-500 text-xs mt-1"`                                                                                                                             |

## Example

```jsx
import { ReactMultistepLeadForm } from 'react-multistep-lead-form';
function App() {
  const handleComplete = () => {
    console.log('Form completed!');
  };
  const lookingForOptions = ['Option 1', 'Option 2', 'Option 3'];
  return (
    <ReactMultistepLeadForm
      onComplete={handleComplete}
      apiUrl="https://api.example.com/submit-lead"
      lookingForOptions={lookingForOptions}
    />
  );
}
export default App;
```

## Credits

- [TailwindCSS](https://tailwindcss.com/) for the styling
- [Zod](https://zod.dev/) for the form validation
- [tsdx](https://tsdx.io/) for the build setup

## License

MIT
