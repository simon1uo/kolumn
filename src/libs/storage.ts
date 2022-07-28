export enum StorageType {
  Local = 'Local',
  Session = 'Session'
}

export const storageType = StorageType.Local

export class StorageHandler {
  setItem (type: StorageType, key: string, value: string) {
    if (type === StorageType.Local) {
      localStorage.setItem(key, value)
    } else {
      sessionStorage.setItem(key, value)
    }
  }

  getItem (type: StorageType, key: string) {
    if (type === StorageType.Local) {
      return localStorage.getItem(key)
    } else {
      return sessionStorage.getItem(key)
    }
  }

  removeItem (type: StorageType, key: string) {
    if (type === StorageType.Local) {
      if (this.getItem(StorageType.Local, key)) {
        localStorage.removeItem(key)
      } else {
        if (this.getItem(StorageType.Session, key)) {
          sessionStorage.removeItem(key)
        }
      }
    }
  }

  clear (type: StorageType) {
    if (type === StorageType.Local) {
      localStorage.clear()
    } else {
      sessionStorage.clear()
    }
  }
}
