[쉬운 시작 안내로 돌아가기](../README.ko.md)

# N2 Personas

AI 애플리케이션에서 활용하는 10개 분야, 72개 역할 프롬프트입니다. Node.js 로더와 Markdown 원문을 제공합니다.

## 설치와 사용

Node.js 20 이상에서 GitHub 태그로 설치합니다.

```sh
npm install github:choihyunsus/n2-personas#v1.0.0
```

```js
import { listPersonas, getPersona } from 'n2-personas';

console.log(listPersonas('dev'));
const profile = getPersona('dev/web-frontend');
console.log(profile.prompt);
```

`listPersonas`는 역할 목록을 반환합니다. `getPersona`는 선택한 역할의 메타데이터와 프롬프트를 읽습니다. 존재하지 않는 식별자는 오류로 처리합니다.

호스트 애플리케이션에서 기존 에이전트 정체성과 권한, 프로젝트 기억 범위를 유지하면서 역할 프롬프트를 추가하세요. 결과 품질은 실제 모델과 작업으로 평가해야 합니다. 프롬프트에 등장하는 기술 버전은 대상 프로젝트의 의존성과 대조하세요.

## Soul 연동

읽기 전용 역할 자료이므로 DB 없이 단독으로 사용할 수 있습니다. 역할 선택을 기억하려면 호스트에서 배포판 Soul 9.2의 `n2_kv_save` 도구를 호출합니다.

```json
{
  "agent": "example-agent",
  "project": "example-project",
  "summary": "프론트엔드 검토에 dev/web-frontend 역할을 선택했다.",
  "decisions": ["n2-personas 1.0.0의 dev/web-frontend 사용"],
  "todo": []
}
```

`agent`와 `project`는 실제 사용자의 범위로 지정합니다. 필드명은 Soul의 기존 도구 계약을 따릅니다. 호스트는 저장 응답을 확인해야 합니다.

## 검증

`npm test`로 72개 프로필 로딩, 개수, 경로 입력, 메타데이터 격리를 검사합니다. `npm pack --dry-run`으로 배포 파일 목록을 확인합니다.

MIT 라이선스를 적용하며, 원본 N2 Daebung의 저작권 고지를 포함합니다.
