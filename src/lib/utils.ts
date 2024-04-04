import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskCPF(value: string): string {
  // Format CPF as 999.999.999-99
  return value
    .replace(/\D/g, '') // Remove non-digit characters
    .slice(0, 11) // Limit to 11 characters (length of CPF)
    .replace(/(\d{3})(\d)/, '$1.$2') // Add dot after first 3 digits
    .replace(/(\d{3})(\d)/, '$1.$2') // Add dot after next 3 digits
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Add dash before last 2 digits
}

export function maskCellphone(value: string): string {
  // Format cellphone as (99) 99999-9999
  return value
    .replace(/\D/g, '') // Remove non-digit characters
    .slice(0, 11) // Limit to 11 characters (length of cellphone)
    .replace(/(\d{2})(\d)/, '($1) $2') // Add parenthesis around first 2 digits
    .replace(/(\d{5})(\d)/, '$1-$2') // Add dash after next 5 digits
}
