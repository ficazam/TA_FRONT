import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
// Creating selector alias with type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
