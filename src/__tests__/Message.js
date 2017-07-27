import expect from 'expect';

import Message from '../Message';

describe('Message', () => {
  it('should return a Message', () => {
    const message = new Message();
    expect(message).toBeA(Message);
    expect(message.context).toBeA(Function);
    expect(message.get).toBeA(Function);
  });

  it('should merge messages into a single dictionary', () => {
    const message = new Message({ a: 'A', d: 'D' }, { b: 'Bb', d: 'Dd' });
    expect(message.get('a')).toBe('A');
    expect(message.get('b')).toBe('Bb');
    expect(message.get('d')).toBe('Dd');
  });

  describe('.get()', () => {
    it('should return the key if not in the dictionary', () => {
      const message = new Message({ a: 'A' });
      expect(message.get('a')).toBe('A');
      expect(message.get('o.O')).toBe('o.O');
    });

    it('should return the result of a message function', () => {
      const message = new Message({ a: () => 'Aa' });
      expect(message.get('a')).toBe('Aa');
    });

    it('should pass the key to a message function', () => {
      const message = new Message({ A: k => k.repeat(3) });
      expect(message.get('A')).toBe('AAA');
    });

    it('should pass the key and context to a message function', () => {
      const message = new Message({ o: (k, c) => `${k}.${c}` }).context('O');
      expect(message.get('o')).toBe('o.O');
    });
  });
});
