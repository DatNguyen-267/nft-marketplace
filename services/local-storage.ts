enum StorageVal {
  LOGGED = 'logged',
}
export const LocalStorageServices = {
  isLogged: () => {
    return localStorage.getItem(StorageVal.LOGGED) === 'true'
  },
}
