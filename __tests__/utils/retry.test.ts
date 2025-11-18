import { retryWithBackoff } from '@/utils/retry';

describe('retryWithBackoff', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should succeed on first attempt', async () => {
    const mockFn = jest.fn().mockResolvedValue('success');
    const result = await retryWithBackoff(mockFn, 3, 1000);

    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should retry on failure and succeed on second attempt', async () => {
    const mockFn = jest
      .fn()
      .mockRejectedValueOnce(new Error('First failure'))
      .mockResolvedValueOnce('success');

    const result = await retryWithBackoff(mockFn, 3, 1);

    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(2);
  }, 10000);

  it('should retry with exponential backoff', async () => {
    const mockFn = jest
      .fn()
      .mockRejectedValueOnce(new Error('First failure'))
      .mockRejectedValueOnce(new Error('Second failure'))
      .mockResolvedValueOnce('success');

    const result = await retryWithBackoff(mockFn, 3, 1);

    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(3);
  }, 10000);

  it('should throw error after max retries', async () => {
    const error = new Error('Persistent failure');
    const mockFn = jest.fn().mockRejectedValue(error);

    await expect(retryWithBackoff(mockFn, 2, 1)).rejects.toThrow(
      'Failed after 3 attempts: Persistent failure'
    );
    expect(mockFn).toHaveBeenCalledTimes(3); // Initial + 2 retries
  }, 10000);

  it('should use default maxRetries and initialDelay', async () => {
    const mockFn = jest.fn().mockResolvedValue('success');
    const result = await retryWithBackoff(mockFn);

    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle non-Error rejections', async () => {
    const mockFn = jest.fn().mockRejectedValue('String error');

    await expect(retryWithBackoff(mockFn, 1, 1)).rejects.toThrow('Failed after 2 attempts');
    expect(mockFn).toHaveBeenCalledTimes(2);
  }, 10000);
});
