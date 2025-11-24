import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'tche_token';

export async function setToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function clearToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'auth_token';

export async function setToken(token: string) {
  await AsyncStorage.setItem(KEY, token);
}
export async function getToken() {
  return AsyncStorage.getItem(KEY);
}
export async function clearToken() {
  await AsyncStorage.removeItem(KEY);
}
