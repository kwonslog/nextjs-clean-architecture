import { createModule } from '@evyweb/ioctopus';

import { MockInstrumentationService } from '@/src/infrastructure/services/instrumentation.service.mock';
import { InstrumentationService } from '@/src/infrastructure/services/instrumentation.service';
import { MockCrashReporterService } from '@/src/infrastructure/services/crash-reporter.service.mock';
import { CrashReporterService } from '@/src/infrastructure/services/crash-reporter.service';

import { DI_SYMBOLS } from '@/di/types';

export function createMonitoringModule() {

  // 모듈 단위로 의존성 객체를 등록 할 수 있다.
  const monitoringModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    monitoringModule
      // 컨테이너를 통해 등록된 구현체를 가져올때 사용할 key 값
      .bind(DI_SYMBOLS.IInstrumentationService)
      // 컨테이너에 등록할 실제 구현체
      .toClass(MockInstrumentationService);
    monitoringModule
      .bind(DI_SYMBOLS.ICrashReporterService)
      .toClass(MockCrashReporterService);
  } else {
    monitoringModule
      .bind(DI_SYMBOLS.IInstrumentationService)
      .toClass(InstrumentationService);
    monitoringModule
      .bind(DI_SYMBOLS.ICrashReporterService)
      .toClass(CrashReporterService);
  }

  return monitoringModule;
}
