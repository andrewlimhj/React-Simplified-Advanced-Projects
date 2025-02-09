// type ChildProps = {
//   name: string;
// };

// export function Child({ name }: ChildProps) {
//   return <h1>{name}</h1>;
// }

import type { ComponentProps } from 'react';

type ButtonProps = {
  outline?: boolean;
} & ComponentProps<'button'>;

export function Button({ outline, ...props }: ButtonProps) {
  return (
    <button
      style={{ border: outline ? '1px solid red' : undefined }}
      {...props}
    ></button>
  );
}
