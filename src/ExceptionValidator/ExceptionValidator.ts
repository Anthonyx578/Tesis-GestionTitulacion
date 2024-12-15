import { FailResponse } from 'src/Response/Responses';

export function noConectionValidator(e: any) {
  if (e.message.includes('Empty response')) {
    return true;
  }
  return false;
}
