import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('should reverse the value', () => {
    const reversePipe = new ReversePipe();
    const reversed = reversePipe.transform('hello');
    expect(reversed).toEqual('olleh');
  });
});
