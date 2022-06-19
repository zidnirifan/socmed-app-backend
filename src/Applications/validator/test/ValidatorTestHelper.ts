/* istanbul ignore file */

import Validator from '../Validator';

class MockValidator extends Validator<any> {
  validate(payload: any): void {
    throw new Error('Method not implemented.');
  }
}

export default MockValidator;
