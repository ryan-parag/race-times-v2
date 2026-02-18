import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article' | 'section';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', as: Component = 'div', ...props }, ref) => (
    <Component
      ref={ref}
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export { Card };
