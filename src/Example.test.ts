import { Example } from './Example';

describe('Given an Example', () => {
  describe('When it is created', () => {
    it('Then it should be an object', () => {
      expect(typeof new Example()).toBe('object');
    });
  });

  describe("When it's method helloWorld is called", () => {
    it('Then it should return "Hello, world!"', () => {
      /**
       * Failing Test
       */
      expect(new Example().helloWorld()).toBe('Hello world!');
    });
  });
});
