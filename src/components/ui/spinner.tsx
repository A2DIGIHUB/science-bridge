interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Spinner = ({ className, ...props }: SpinnerProps) => {
  return (
    <div 
      className={`animate-spin rounded-full h-8 w-8 border-b-2 border-primary ${className || ''}`}
      {...props}
    />
  );
};
