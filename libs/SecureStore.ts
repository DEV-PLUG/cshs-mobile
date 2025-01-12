import * as SecureStore from 'expo-secure-store';

export async function getValueFor(key:string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return undefined;
  }
}

export async function saveItem(key:string, value:any) {
  await SecureStore.setItemAsync(key, value);
}

export async function deleteItem(key:string) {
  await SecureStore.deleteItemAsync(key);
}