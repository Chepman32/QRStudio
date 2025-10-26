/**
 * Code Store Tests
 */

import {renderHook, act} from '@testing-library/react-native';
import {useCodeStore} from '@/store/codeStore';

describe('CodeStore', () => {
  beforeEach(() => {
    const {result} = renderHook(() => useCodeStore());
    act(() => {
      result.current.codes.forEach(code => {
        result.current.deleteCode(code.id);
      });
    });
  });

  it('should add a code', () => {
    const {result} = renderHook(() => useCodeStore());

    act(() => {
      result.current.addCode({
        type: 'QR',
        data: 'https://example.com',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        size: 256,
      });
    });

    expect(result.current.codes).toHaveLength(1);
    expect(result.current.codes[0].data).toBe('https://example.com');
  });

  it('should update a code', () => {
    const {result} = renderHook(() => useCodeStore());

    let codeId: string;
    act(() => {
      result.current.addCode({
        type: 'QR',
        data: 'https://example.com',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        size: 256,
      });
      codeId = result.current.codes[0].id;
    });

    act(() => {
      result.current.updateCode(codeId, {title: 'Updated Title'});
    });

    expect(result.current.codes[0].title).toBe('Updated Title');
  });

  it('should delete a code', () => {
    const {result} = renderHook(() => useCodeStore());

    let codeId: string;
    act(() => {
      result.current.addCode({
        type: 'QR',
        data: 'https://example.com',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        size: 256,
      });
      codeId = result.current.codes[0].id;
    });

    act(() => {
      result.current.deleteCode(codeId);
    });

    expect(result.current.codes).toHaveLength(0);
  });

  it('should toggle favorite', () => {
    const {result} = renderHook(() => useCodeStore());

    let codeId: string;
    act(() => {
      result.current.addCode({
        type: 'QR',
        data: 'https://example.com',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        size: 256,
      });
      codeId = result.current.codes[0].id;
    });

    expect(result.current.codes[0].isFavorite).toBe(false);

    act(() => {
      result.current.toggleFavorite(codeId);
    });

    expect(result.current.codes[0].isFavorite).toBe(true);
  });

  it('should filter codes by search query', () => {
    const {result} = renderHook(() => useCodeStore());

    act(() => {
      result.current.addCode({
        type: 'QR',
        data: 'https://example.com',
        title: 'Example',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        size: 256,
      });
      result.current.addCode({
        type: 'QR',
        data: 'https://test.com',
        title: 'Test',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        size: 256,
      });
    });

    act(() => {
      result.current.setSearchQuery('example');
    });

    const filtered = result.current.getFilteredCodes();
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('Example');
  });

  it('should sort codes by date', () => {
    const {result} = renderHook(() => useCodeStore());

    act(() => {
      result.current.addCode({
        type: 'QR',
        data: 'First',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        size: 256,
      });
      result.current.addCode({
        type: 'QR',
        data: 'Second',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        size: 256,
      });
    });

    act(() => {
      result.current.setSortBy('date');
    });

    const sorted = result.current.getFilteredCodes();
    expect(sorted[0].data).toBe('Second'); // Most recent first
  });
});
