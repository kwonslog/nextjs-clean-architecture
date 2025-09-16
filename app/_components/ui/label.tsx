'use client';

// export 에 접근할때 React. 으로 접근 하도록 선언
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

// type 을 사용하면 type 형태로만 사용함. 런타임 번들에 포함되지 않음.
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/app/_components/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

/*
이 코드는 `LabelPrimitive.Root`라는 외부 컴포넌트를 감싸서 새로운 `Label` 컴포넌트를 정의한 것으로,
`React.forwardRef`를 사용해 부모로부터 전달된 `ref`를 안전하게 이어주고,
`React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>`로 원래 컴포넌트가 가질 수 있는
모든 props를 그대로 계승하며, 동시에 `VariantProps<typeof labelVariants>`를 교차(`&`)시켜 스타일
변형 옵션도 받을 수 있도록 확장한 패턴이다. 내부에서는 `className`만 따로 꺼내고 나머지 props를
그대로 스프레드(`{...props}`)로 전달하면서, `cn(labelVariants(), className)`로 기본 스타일과
사용자 지정 클래스명을 합쳐 적용하여, 결과적으로 타입 안정성과 재사용성을
모두 갖춘 “확장된 래퍼 컴포넌트”를 만들어낸다.
*/
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>, // ref 타입 (HTMLLabelElement)
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> // 기본 props
  & VariantProps<typeof labelVariants>> // 추가 props
  (({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));

// React DevTools에서 컴포넌트 이름을 명확히 표시해 디버깅을 쉽게 하기 위해 지정
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
