import { renderHook } from '@testing-library/react-hooks';
import { Map } from 'leaflet';
import { useRef } from 'react';
import { makeCity } from '../utils/mocks';
import useMap from './use-map';

describe('Hook: UseMap', () => {
  it('should return instance of leaflet.Map', () => {
    const mockElement = document.createElement('div');
    const fakeCity = makeCity();

    const { result: useRefResult } = renderHook(() => useRef(mockElement));
    const mapRef = useRefResult.current;

    const { result } = renderHook(() => useMap(mapRef, fakeCity));
    const map = result.current;

    expect(map).toBeInstanceOf(Map);
  });
});

export { };
