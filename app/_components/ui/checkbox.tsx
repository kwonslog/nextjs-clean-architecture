'use client';
import * as React from 'react';

/*
radix 공식 문서의 샘플 코드는
  import { Checkbox } from 'radix-ui'; 를 사용하고 있는데

실무 기준으로는
  '@radix-ui/react-checkbox'
이렇게 개별 컴포넌트를 가져와서 사용하는 것을 권장한다.

'radix-ui' 를 사용해도 tree-shaking 을 통해 번들링 최적화를 한다고 하지만
조건에 따라 최적화 정도가 달라질수 있다고 한다.
*/
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

// 체크 아이콘(SVG)
import { Check } from 'lucide-react';

import { cn } from '@/app/_components/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
