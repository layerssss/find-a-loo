import {
    LocationObjectCoords,
    LocationSubscription,
    requestForegroundPermissionsAsync,
    watchPositionAsync,
} from "expo-location";
import { createContext, useEffect, useState } from "react";

export const locationContext = createContext<{
  coords: LocationObjectCoords | null;
  requestLocation: () => Promise<void>;
}>({ coords: null, requestLocation: async () => {} });

export default function LocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [coords, setCoords] = useState<LocationObjectCoords | null>(null);
  const [locationSubscription, locationSubscriptionSet] =
    useState<LocationSubscription | null>(null);

  const requestLocation = async () => {
    if (locationSubscription) return;
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return console.error("Location permission not granted");
    }
    const locationSubscriptionNew = await watchPositionAsync({}, (location) => {
      setCoords(location.coords);
    });
    locationSubscriptionSet(locationSubscriptionNew);
  };

  useEffect(() => {
    requestLocation();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return (
    <locationContext.Provider value={{ coords, requestLocation }}>
      {children}
    </locationContext.Provider>
  );
}
