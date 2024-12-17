import { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
        <textarea
          ref={ref}
          {...props}
          className="w-full px-4 py-2 bg-space-gray/50 border border-gray-600 rounded-md 
                   focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue
                   text-white placeholder-gray-400 min-h-[65px] resize-y"
        />
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;