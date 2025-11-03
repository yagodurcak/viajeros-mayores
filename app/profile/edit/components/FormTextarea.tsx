interface FormTextareaProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  helperText?: string;
  disabled?: boolean;
}

export default function FormTextarea({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  helperText,
  disabled = false,
}: FormTextareaProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent transition-all resize-none text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder={placeholder}
      />
      {helperText && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
}
