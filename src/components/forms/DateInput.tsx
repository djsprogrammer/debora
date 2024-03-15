import { getCurrentDate } from 'formFunctions/common'
import { useEffect, useRef } from 'react'

interface DateInputProps {
    setDate: React.Dispatch<React.SetStateAction<string>>
}

const DateInput = ({ setDate }: DateInputProps) => {

    const dateInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (dateInput.current) {
            dateInput.current.value = getCurrentDate()
        }
    }, [])

    return (
        <div className='input-group'>
            <label className='input-group-text'>Escolha uma data</label>
            <input ref={dateInput} onChange={e => setDate(e.target.value)} className='pe-1 form-control text-center' type='date' required />
        </div>
    )

}

export default DateInput