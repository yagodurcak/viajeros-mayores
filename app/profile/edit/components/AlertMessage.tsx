interface AlertMessageProps {
  type: 'success' | 'error';
  message: string;
}

export default function AlertMessage({ type, message }: AlertMessageProps) {
  const isSuccess = type === 'success';

  return (
    <div
      className={`p-4 rounded-lg ${
        isSuccess
          ? 'bg-green-50 border border-green-200'
          : 'bg-red-50 border border-red-200'
      }`}
    >
      <p
        className={`text-sm font-medium ${
          isSuccess ? 'text-green-800' : 'text-red-800'
        }`}
      >
        {message}
      </p>
    </div>
  );
}
