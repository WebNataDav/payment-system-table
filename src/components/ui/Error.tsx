export const Error = ({ message }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg">
      <h3 className="text-lg font-medium text-red-800">Something went wrong</h3>
      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </div>
  );
};