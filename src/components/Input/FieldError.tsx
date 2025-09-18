export const FieldError = ({
  errorMessages,
}: {
  errorMessages: (string | undefined)[];
}) => {
  const errorMessagesSet = new Set<string>();
  for (const error of errorMessages) {
    if (!error) continue;
    errorMessagesSet.add(error);
  }

  if (!errorMessagesSet.size) return null;

  return (
    <em className='text-red-500 text-xs'>
      {Array.from(errorMessagesSet).map((errorMessage, index) => (
        <span key={errorMessage! + index}>
          {errorMessage}
          <br />
        </span>
      ))}
    </em>
  );
};
