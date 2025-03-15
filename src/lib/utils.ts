import { clsx, type ClassValue } from 'clsx'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | number, formatString?: string) {
	if (formatString) {
		return moment(date).format(formatString)
	}
	return moment(date).fromNow()
}
