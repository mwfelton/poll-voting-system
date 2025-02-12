import { createPoll } from '../../api/createPollsAPI';

global.fetch = jest.fn();

describe('createPoll', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  it('should create a poll and return the response data', async () => {
    const mockResponse = { id: 1, question: 'Test Question', options: ['Option 1', 'Option 2'] };
    
    // Mocking fetch to resolve with a successful response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const question = 'Test Question';
    const options = ['Option 1', 'Option 2'];

    const result = await createPoll(question, options);
    
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/polls/createPoll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        options: options.map((text) => ({ text })),
      }),
    });
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error when the fetch response is not ok', async () => {
    // Mocking fetch to resolve with a failed response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Error' }),
    });

    const question = 'Test Question';
    const options = ['Option 1', 'Option 2'];

    await expect(createPoll(question, options)).rejects.toThrow('Failed to create poll');
  });
});
