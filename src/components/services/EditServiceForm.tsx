import { useState, useEffect } from 'react'

import { generateNewValue } from 'formFunctions/service/common'
import { checkForValueInTheSameDate } from 'formFunctions/service/editService'
import { validNumber, orderServices, notify } from 'formFunctions/common'
import { INVALID_NUMBER_TEXT } from 'constants/errors'

import { Service, ServicesState, Value } from 'types/services'

import Container from 'components/forms/Container'
import FormHeader from 'components/forms/Header'
import ValueInput from 'components/forms/ValueInput'
import ConfirmFormButtons from 'components/pages/ConfirmFormButtons'


interface EditServiceFormProps {
	servicesState: ServicesState
	serviceForEdition: Service
	setEditServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

const EditServiceForm = ({ servicesState, serviceForEdition, setEditServiceForm }: EditServiceFormProps) => {

	const [services, setServices] = servicesState
	const [blockedActions, setBlockedActions] = useState(false)
	const [value, setValue] = useState('')
	const [allInputsFilled, setAllInputsFilled] = useState(false)

	useEffect(() => {
		if (value) setAllInputsFilled(true)
	}, [value])

	const editService = () => {
		if (!blockedActions) {
			setBlockedActions(true)
			if (validNumber(value)) {
				const newValue: Value = generateNewValue(value)
				checkForValueInTheSameDate(serviceForEdition, newValue)

				const otherServices = services.filter(service => {
					return service._id !== serviceForEdition._id
				})
				setServices(orderServices([...otherServices, serviceForEdition]))
				// Salvando na memória
				localStorage.setItem('services', JSON.stringify(orderServices([...otherServices, serviceForEdition])))
				setEditServiceForm(false)
			} else {
				notify(INVALID_NUMBER_TEXT)
				setEditServiceForm(false)
			}
		}
	}

	return (
		<Container>
			<FormHeader text='Editar Serviço' />
			<div className='card-body'>
				<h6 className='text-center'>{serviceForEdition._id}</h6>
				<form onSubmit={e => {
					e.preventDefault()
					editService()
				}}>
					<ValueInput margin='my-3' setValue={setValue} />
					<ConfirmFormButtons
						allInputsFilled={allInputsFilled}
						blockedActions={blockedActions}
						setForm={setEditServiceForm}
					/>
				</form>
			</div>
		</Container>
	)

}

export default EditServiceForm