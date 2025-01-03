import { AppDispatch, AppState } from "../reducers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector