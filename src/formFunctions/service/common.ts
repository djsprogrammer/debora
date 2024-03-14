import { getCurrentDate } from 'formFunctions/common'

export const generateNewValue = (value: string) => {
    return {
        value: Number(value),
        date: getCurrentDate()
    }
}

export const notify = async (text: string) => {
    await Notification.requestPermission()
    new Notification(text)
}