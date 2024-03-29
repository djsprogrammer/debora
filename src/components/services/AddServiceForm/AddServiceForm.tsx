import React, { useContext, useState, useEffect, useCallback } from 'react'

import { generateNewValue } from 'formFunctions/service/common'
import { validNumber, orderServices, notify } from 'formFunctions/common'
import { INVALID_NUMBER_TEXT } from 'constants/errors'

import { Service } from 'types/services'

import Container from 'components/forms/Container'
import FormHeader from 'components/forms/Header'
import SelectCategoryInput from './SelectCategoryInput'
import NameInput from 'components/forms/NameInput'
import ValueInput from 'components/forms/ValueInput'
import ConfirmFormButtons from 'components/pages/ConfirmFormButtons'

import { DocsContext } from 'DocsContext'

const ALREADY_EXISTS_TEXT = 'Já existe um serviço com esse nome!'

interface Props {
    setAddServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

const AddServiceForm = ({ setAddServiceForm }: Props) => {

    const [services, setServices] = useContext(DocsContext).services
    const [blockedActions, setBlockedActions] = useState(false)

    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [value, setValue] = useState('')

    const [allInputsFilled, setAllInputsFilled] = useState(false)

    // Verificando se todos os inputs foram preenchidos
    // Pois caso não tenham sido, será impedido a mudança no comportamento do botão
    useEffect(() => {
        if (name && value) {
            setAllInputsFilled(true)
        }
    }, [name, value])

    const setFirstCategoryOption = useCallback((firstCategory: string) => {
        setCategory(firstCategory)
    }, [])

    const addService = () => {
        if (!blockedActions) {
            setBlockedActions(true)
            const alreadyExists = services.filter(service => service._id === name)[0]
            if (!alreadyExists) {
                if (validNumber(value)) {
                    const service: Service = {
                        category,
                        _id: name,
                        value: [generateNewValue(value)]
                    }
                    const newServices = orderServices([...services, service])
                    setServices(newServices)
                    // Salvando na memória
                    localStorage.setItem('services', JSON.stringify(newServices))
                    setBlockedActions(false)
                    setAddServiceForm(false)
                } else {
                    notify(INVALID_NUMBER_TEXT)
                    setBlockedActions(false)
                    setAddServiceForm(false)
                }
            } else {
                notify(ALREADY_EXISTS_TEXT)
                setBlockedActions(false)
                setAddServiceForm(false)
            }
        }
    }

    return (
        <Container>
            <FormHeader text='Registrar Serviço' />
            <div className='card-body'>
                <form className='d-flex flex-column' onSubmit={e => {
                    e.preventDefault()
                    addService()
                }}>
                    <SelectCategoryInput
                        setFirstCategoryOption={setFirstCategoryOption}
                        setCategory={setCategory}
                    />
                    <NameInput setName={setName} />
                    <ValueInput margin='my-3' setValue={setValue} />
                    <ConfirmFormButtons
                        allInputsFilled={allInputsFilled}
                        blockedActions={blockedActions}
                        setForm={setAddServiceForm}
                    />
                </form>
            </div>
        </Container>
    )

}

export default AddServiceForm