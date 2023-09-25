import { type ClassValue, clsx } from 'clsx'
import { EventListener } from 'services'
import { twMerge } from 'tailwind-merge'

class Backdrop {
  open() {
    EventListener.emit('backdrop', true)
  }
  close() {
    EventListener.emit('backdrop', false)
  }
}

export const backdrop = new Backdrop()

class Toast {
  private emit(message: string, type: NToast.Type) {
    EventListener.emit<NToast.Emit>('toast', { message, type })
  }
  success(message: string) {
    this.emit(message, 'success')
  }
  info(message: string) {
    this.emit(message, 'info')
  }
  warn(message: string) {
    this.emit(message, 'warn')
  }
  error(message: string) {
    this.emit(message, 'error')
  }
}

export const toast = new Toast()

export function isURL(url: string) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return !!pattern.test(url)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
