import React, {
  createContext,
  FC,
  MutableRefObject,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Person } from "../models/person";
import { Profile } from "../models/profile";
import { PersonService } from "../services/person";

type ValueType = Array<[number, Person, Profile]>;

interface DataContextValue {
  currentValue: ValueType;
  refreshValue: () => Promise<void>;
  loading: boolean;
}

const DataContext = createContext<DataContextValue>({
  currentValue: [],
  loading: false,
  refreshValue: () => {
    return Promise.resolve();
  },
});

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataContextProvider: FC = ({ children }) => {
  const [currentValue, setCurrentValue] = useState<ValueType>([]);
  const [loading, setLoading] = useState(false);

  const refreshValue = useCallback(async () => {
    setLoading(true);
    try {
      const res = await PersonService.queryAll();
      console.log("res", res);
      setCurrentValue(res);
    } catch (e) {
      console.log("Error:", e);
    }
    setLoading(false);
  }, []);

  const value = useMemo<DataContextValue>(() => {
    return {
      currentValue,
      refreshValue,
      loading,
    };
  }, [currentValue, loading]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
