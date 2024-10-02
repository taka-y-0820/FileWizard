interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export function Text({ children, className = "" }: TextProps) {
  return <span className={`text-gray-700 ${className}`}>{children}</span>;
}

export function Title({ children, className = "" }: TextProps) {
  return (
    <h1 className={`text-2xl font-bold text-gray-800 ${className}`}>
      {children}
    </h1>
  );
}

export function Subtitle({ children, className = "" }: TextProps) {
  return (
    <h2 className={`text-xl font-semibold text-gray-700 ${className}`}>
      {children}
    </h2>
  );
}
