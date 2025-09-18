import { z } from 'zod';

import { ISignInUseCase } from '@/src/application/use-cases/auth/sign-in.use-case';
import { InputParseError } from '@/src/entities/errors/common';
import { Cookie } from '@/src/entities/models/cookie';
import type { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';

const inputSchema = z.object({
  username: z.string().min(3).max(31),
  password: z.string().min(6).max(31),
});

// getInjection() 함수는 실제 의존성 객체를 얻을때 사용한다.
//  해당 함수가 호출되면 내부에서 ApplicationContainer.get() 를 통해 실제 구현체를 얻을 수 있는데
//  이때 반환 타입을 명시하기 위해 아래와 같이 타입값 설정이 필요하다.
export type ISignInController = ReturnType<typeof signInController>;

// ioctopus 모듈에 고차함수 형태로 등록 되고, 등록 할때 2개의 인자값을 주입 받는다.
//  이후 ApplicationContainer.get() 을 통해 리턴된 함수를 사용한다.
export const signInController =
  (
    instrumentationService: IInstrumentationService,
    signInUseCase: ISignInUseCase
  ) =>
    // Partial<> : inputSchema 의 타입의 모든 속성을 선택값으로 만든다.
  async (input: Partial<z.infer<typeof inputSchema>>): Promise<Cookie> => {
    // await 사용은 필요하지 않다.
    return instrumentationService.startSpan(
      { name: 'signIn Controller' },
      async () => {

        // parse 성공시 success = true, data
        //       실패시 success = false, error
        const { success, data, error: inputParseError } = inputSchema.safeParse(input);

        if (inputParseError) {
          throw new InputParseError('Invalid data', { cause: inputParseError });
        }

        // 리턴 되는 값에서 필요한 값(cookie) 만 꺼내서 리턴..
        const { cookie } = await signInUseCase(data);
        return cookie;
      }
    );
  };
