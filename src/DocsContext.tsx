import React, { createContext, useEffect, useState } from 'react'

import { DEFAULT_SERVICE, ServicesState, Services } from './types/services'
import { DEFAULT_SCHEDULING, SchedulingsState, Schedulings } from 'types/schedulings'
import { DEFAULT_EXPENSE, ExpensesState, Expenses } from 'types/expenses'

interface TDocsContext {
    services: ServicesState
    schedulings: SchedulingsState
    expenses: ExpensesState
}

const DEFAULT_CONTEXT: TDocsContext = {
    services: [[DEFAULT_SERVICE], () => { }],
    schedulings: [[DEFAULT_SCHEDULING], () => { }],
    expenses: [[DEFAULT_EXPENSE], () => { }]
}

export const DocsContext = createContext<TDocsContext>(DEFAULT_CONTEXT)

interface DocsProviderProps {
    children: React.ReactNode
}

const DocsProvider = ({ children }: DocsProviderProps) => {

    // Documentos usados na aplicação
    const [services, setServices] = useState<Services>([])
    const [schedulings, setSchedulings] = useState<Schedulings>([])
    const [expenses, setExpenses] = useState<Expenses>([])

    const docs: TDocsContext = {
        services: [services, setServices],
        schedulings: [schedulings, setSchedulings],
        expenses: [expenses, setExpenses]
    }

    useEffect(() => {
        const services = localStorage.getItem('services')
        const expenses = localStorage.getItem('expenses')
        const schedulings = localStorage.getItem('schedulings')
        if (services) {
            setServices(JSON.parse(services))
        }
        if (expenses) {
            setExpenses(JSON.parse(expenses))
        }
        if (schedulings) {
            setSchedulings(JSON.parse(schedulings))
        }
    }, [])

    return (
        <DocsContext.Provider value={docs}>
            {children}
        </DocsContext.Provider>
    )

}

export default DocsProvider