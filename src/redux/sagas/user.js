import {
  createUserAPI,
  deleteUserByIdAPI,
  getUsersAPI,
  getUsersByIdAPI,
  updateUserAPI,
} from "../../apis";
import { setUserSlice } from "../slice/user";
import {
  addUserSlice,
  deleteUsersSlice,
  editUserSlice,
  getUsersSlice,
} from "../slice/users";
import {
  CREATE_USER,
  DELETE_USER_BY_ID,
  GET_USERS,
  GET_USER_BY_ID,
  UPDATE_USER_BY_ID,
} from "../types";
import { takeEvery, put } from "redux-saga/effects";

export function* getUsersSaga() {
  const users = yield getUsersAPI();
  yield put(getUsersSlice(users.data));
}

export function* getUserByIdSaga(action) {
  yield getUsersByIdAPI(action.id);
  yield put(setUserSlice(action.id));
}

export function* createUserSaga(action) {
  yield createUserAPI(action.user);
  yield put(addUserSlice(action.user));
}

export function* updateUserSaga(action) {
  yield updateUserAPI(action.user);
  yield put(editUserSlice(action.user));
}

export function* deleteUserIdSaga(action) {
  yield deleteUserByIdAPI(action.id);
  yield put(deleteUsersSlice(action.id));
}

export function* watchUsersAsync() {
  yield takeEvery(GET_USERS, getUsersSaga);
  yield takeEvery(GET_USER_BY_ID, getUserByIdSaga);
  yield takeEvery(CREATE_USER, createUserSaga);
  yield takeEvery(UPDATE_USER_BY_ID, updateUserSaga);
  yield takeEvery(DELETE_USER_BY_ID, deleteUserIdSaga);
}
