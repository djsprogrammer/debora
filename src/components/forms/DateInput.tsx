import { getCurrentDate } from "formFunctions/common"
import { useEffect, useRef } from "react"

interface DateInputProps {
    setDate: React.Dispatch<React.SetStateAction<string>>
}

const DateInput = ({ setDate }: DateInputProps) => {

    const input = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (input.current) {
            input.current.value = getCurrentDate()
            setDate(getCurrentDate)
        }
    }, [])

    return (
        <div className='input-group'>
            <label className='input-group-text'>Escolha uma data</label>
            <input ref={input} onChange={e => setDate(e.target.value)} className='pe-1 form-control text-center' type='date' required />
        </div>
    )

}

export default DateInput