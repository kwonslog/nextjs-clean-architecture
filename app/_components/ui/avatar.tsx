'use client';

import * as React from 'react';

/*
https://www.radix-ui.com/primitives/docs/components/avatar
공식 문서를 보면 해당 컴포넌트의 UI 를 확인 할 수 있다.
*/

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/app/_components/utils';

/*
React.forwardRef는 부모가 전달한 ref를 자식 컴포넌트의 특정 DOM 요소나 하위 컴포넌트에
연결할 수 있도록 해주는 고차 함수(HOC)이다.
forwardRef는 하나의 렌더링 함수 (props, ref) => JSX를 인자로 받으며,
타입스크립트 사용 시 제네릭 인자로 두 가지를 지정한다.
첫 번째는 ref가 가리킬 대상 타입(RefType),
두 번째는 컴포넌트가 받을 props 타입(PropsType)이다.
부모는 보통 useRef 훅을 사용해 ref를 생성한 뒤 자식 컴포넌트에 전달하며,
자식은 이 ref를 내부의 DOM 요소에 연결해 부모가 해당 DOM을 직접 제어할 수 있게 한다.
*/
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
