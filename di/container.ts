import { createContainer } from '@evyweb/ioctopus';

import { DI_RETURN_TYPES, DI_SYMBOLS } from '@/di/types';

import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';

import { createMonitoringModule } from '@/di/modules/monitoring.module';
import { createAuthenticationModule } from '@/di/modules/authentication.module';
import { createTransactionManagerModule } from '@/di/modules/database.module';
import { createTodosModule } from '@/di/modules/todos.module';
import { createUsersModule } from '@/di/modules/users.module';

// 의존성 객체 관리를 위한 컨테이너를 생성.
const ApplicationContainer = createContainer();

// 의존성 객체들을 모듈 별로 구분하여 컨테이너에 등록.
ApplicationContainer.load(Symbol('MonitoringModule'), createMonitoringModule());
ApplicationContainer.load(Symbol('TransactionManagerModule'), createTransactionManagerModule());
ApplicationContainer.load(Symbol('AuthenticationModule'), createAuthenticationModule());
ApplicationContainer.load(Symbol('UsersModule'), createUsersModule());
ApplicationContainer.load(Symbol('TodosModule'), createTodosModule());

// 제네릭 타입 K 는 DI_SYMBOLS 에 정의된 key:value 중 key 에 해당하는 것만 사용 할 수 있다.
export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {

  // 이미 컨테이너에는 의존성 객체들이 설정 되어 있고,
  //  get() 을 통해 해당 객체를 꺼내온다.
  const instrumentationService =
    ApplicationContainer.get<IInstrumentationService>(
      DI_SYMBOLS.IInstrumentationService
    );

  // startSpan 호출 할때  제네릭 타입 T를 선언하지 않은 이유는
  //  callback 의 리턴타입을 보고 타입스크립트가 추론 가능하기 때문
  return instrumentationService.startSpan(
    {
      name: '(di) getInjection',
      op: 'function',
      attributes: { symbol: symbol.toString() },
    },
    () => ApplicationContainer.get(DI_SYMBOLS[symbol])
  );
}
