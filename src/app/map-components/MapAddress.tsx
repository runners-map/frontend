interface AddressInfoProps {
  newRoadAddr: string;
  lat: number;
  lon: number;
  enterDest: (type: 'start' | 'end' | 'wp', address: string, x: number, y: number) => void;
}

export default function MapAddress({ newRoadAddr, lat, lon, enterDest }: AddressInfoProps) {
  return (
    <div className="bg-gray-100 p-4">
      <div className="flex flex-col space-y-2">
        <p className="text-sm text-gray-700">도로명 주소: {newRoadAddr}</p>
        <p className="text-sm text-gray-700">
          좌표 (WGS84): {lat}, {lon}
        </p>
      </div>
      <div className="flex justify-end space-x-2 mt-3">
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={() => enterDest('start', newRoadAddr, lon, lat)}>
          출발
        </button>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={() => enterDest('end', newRoadAddr, lon, lat)}>
          도착
        </button>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={() => enterDest('wp', newRoadAddr, lon, lat)}>
          경유
        </button>
      </div>
    </div>
  );
}
