import './App.css'
import React from 'react'
import ErrorMessage from './components/ErrorMessage'
import 'bootstrap/dist/css/bootstrap.css'
import Select from 'react-select'

function useTextInputState() {
    const [value, setValue] = React.useState('')
    const onChange = event => setValue(event.target.value)
    return {
        value,
        onChange,
    }
}

function FormField({ children }) {
    return <div className='form-group'>{children}</div>
}

function FormFieldLabel({ children, type }) {
    let className = 'FormField-Label'
    if (type === 'selection') {
        className += ' FormField-Label__Dropdown'
    }
    return <label className={className}>{children}</label>
}

function FormFieldLabelText({ children, type }) {
    let className = 'FormField-LabelText'
    if (type === 'selection') {
        className += ' FormField-LabelText__Dropdown'
    }
    return <span className={className}>{children}</span>
}

function TextInputField({ placeholder, value, onChange, errorMessageLabel }) {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasFocusedOnce, setHasFocusedOnce] = React.useState(false)

    const onFocus = () => {
        setIsFocused(true)
        setHasFocusedOnce(true)
    }

    const onBlur = () => setIsFocused(false)

    return (
        <div>
            <input
                className='FormField-Input FormField-Input__Text'
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {hasFocusedOnce && !isFocused && !value && (
                <ErrorMessage label={errorMessageLabel} />
            )}
        </div>
    )
}

const Diet = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Halal/Kosher', value: 'halal/kosher' },
    { label: 'None', value: 'none' },
]

const Province = [
    { label: 'Alberta', value: 'AB' },
    { label: 'British Columbia', value: 'BC' },
    { label: 'Manitoba', value: 'MB' },
    { label: 'New Brunswick', value: 'NB' },
    { label: 'Newfoundland and Labrador', value: 'NL' },
    { label: 'Nova Scotia', value: 'NS' },
    { label: 'Ontario', value: 'ON' },
    { label: 'Prince Edward Island', value: 'PE' },
    { label: 'Quebec', value: 'QC' },
    { label: 'Saskatchewan', value: 'SK' },
    { label: 'Northwest Territories', value: 'NT' },
    { label: 'Nunavut', value: 'NU' },
    { label: 'Yukon', value: 'YT' },
]

function RadioInputField({ value, checked, onChange }) {
    return (
        <input
            className='FormField-Input FormField-Input__Radio'
            type='radio'
            value={value}
            checked={checked}
            onChange={onChange}
        />
    )
}

//
//
// Starting rendering
//
//

export default function App() {
    const firstNameState = useTextInputState()
    const lastNameState = useTextInputState()
    const cityState = useTextInputState()

    // const [diet, setDiet] = React.useState(null)
    // const onChangeDiet = event => setDiet(event.target.value)

    const [pay, setPay] = React.useState(null)
    const onChangePay = event => setPay(event.target.value)

    const [isAbove19, setIsAbove19] = React.useState(false)
    const onChangeAbove19 = event => setIsAbove19(event.target.checked)

    const [isOnline, setIsOnline] = React.useState(navigator.onLine)

    React.useEffect(() => {
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    const onClickSubmit = () => {
        console.log('Clicked submit button!')
    }

    return (
        <div className='box m-auto'>
            <div className='App-Content'>
                <h1 className='login-header'>Checkout</h1>

                <div class='form-group'>
                    <h4 class='login-header'>Basic Info</h4>
                </div>

                <FormField className='form-group'>
                    <FormFieldLabel>
                        <FormFieldLabelText>First Name</FormFieldLabelText>
                        <TextInputField
                            class='form-field'
                            placeholder='Enter your first name'
                            value={firstNameState.value}
                            onChange={firstNameState.onChange}
                            errorMessageLabel='First name required'
                        />
                    </FormFieldLabel>
                </FormField>

                <FormField className='form-group'>
                    <FormFieldLabel>
                        <FormFieldLabelText>Last Name</FormFieldLabelText>
                        <TextInputField
                            class='form-field'
                            placeholder='Enter your last name'
                            value={lastNameState.value}
                            onChange={lastNameState.onChange}
                            errorMessageLabel='Last name required'
                        />
                    </FormFieldLabel>
                </FormField>

                <FormField>
                    <div className='FormField-Heading'>Diet Restriction</div>

                    <div>
                        <Select options={Diet} placeholder='None' />
                    </div>
                </FormField>

                <div>
                    <h5>Network status: {isOnline ? 'online' : 'offline'}</h5>
                </div>

                <div className='FormSubmit'>
                    <button
                        className='FormSubmit-Button'
                        onClick={onClickSubmit}
                        disabled={
                            !firstNameState.value ||
                            !lastNameState.value ||
                            !Diet ||
                            !isOnline
                        }
                    >
                        Continue
                    </button>
                </div>
            </div>

            {/*  */}
            {/* second page starting */}
            {/*  */}

            <div className='App-Content'>
                <h1 className='login-header'>Checkout</h1>

                <div class='form-group'>
                    <h4 class='login-header'>Address Info</h4>
                </div>

                <FormField className='form-group'>
                    <FormFieldLabel>
                        <FormFieldLabelText>City</FormFieldLabelText>
                        <TextInputField
                            class='form-field'
                            placeholder='Enter your City'
                            value={cityState.value}
                            onChange={cityState.onChange}
                            errorMessageLabel='City required'
                        />
                    </FormFieldLabel>
                </FormField>

                <FormField>
                    <div className='FormField-Heading'>Province</div>

                    <div>
                        <Select options={Province} placeholder='Select your Province' />
                    </div>
                </FormField>

                <div>
                    <h5>Network status: {isOnline ? 'online' : 'offline'}</h5>
                </div>

                <div className='FormSubmit'>
                    <button
                        className='FormSubmit-Button'
                        onClick={onClickSubmit}
                        disabled={!cityState.value || !Province || !isOnline}
                    >
                        Continue
                    </button>
                </div>
            </div>

            {/*  */}
            {/* Third page starting */}
            {/*  */}

            {/*<div className='App-Content'>*/}
            {/*  <h1 className='login-header'>Checkout</h1>*/}

            {/*  <div class='form-group'>*/}
            {/*    <h4 class='login-header'>Payment Info</h4>*/}
            {/*  </div>*/}

            {/*  <FormField className='form-group'>*/}
            {/*    <FormFieldLabel>*/}
            {/*      <FormFieldLabelText>Payment Method</FormFieldLabelText>*/}
            {/*      <div>*/}
            {/*        <FormFieldLabel type='radio'>*/}
            {/*          <FormFieldLabelText type='radio'>*/}
            {/*            <RadioInputField*/}
            {/*              value='bitcoin'*/}
            {/*              checked={pay === 'bitcoin'}*/}
            {/*              onChange={onChangePay}*/}
            {/*            />*/}
            {/*            Bitcoin*/}
            {/*          </FormFieldLabelText>*/}
            {/*        </FormFieldLabel>*/}
            {/*        <br />*/}
            {/*        <FormFieldLabel type='radio'>*/}
            {/*          <FormFieldLabelText type='radio'>*/}
            {/*            <RadioInputField*/}
            {/*              value='paypal'*/}
            {/*              checked={pay === 'paypal'}*/}
            {/*              onChange={onChangePay}*/}
            {/*            />*/}
            {/*            PayPal*/}
            {/*          </FormFieldLabelText>*/}
            {/*        </FormFieldLabel>*/}
            {/*        <br />*/}
            {/*        <FormFieldLabel type='radio'>*/}
            {/*          <FormFieldLabelText type='radio'>*/}
            {/*            <RadioInputField*/}
            {/*              value='credit card'*/}
            {/*              checked={pay === 'credit card'}*/}
            {/*              onChange={onChangePay}*/}
            {/*            />*/}
            {/*            Credit Card*/}
            {/*          </FormFieldLabelText>*/}
            {/*        </FormFieldLabel>*/}
            {/*      </div>*/}
            {/*    </FormFieldLabel>*/}
            {/*  </FormField>*/}

            {/*  <FormField>*/}
            {/*    <FormFieldLabel>*/}
            {/*      <FormFieldLabelText>*/}
            {/*        <input*/}
            {/*          className='FormField-Input FormField-Input__Checkbox'*/}
            {/*          type='checkbox'*/}
            {/*          checked={isAbove19}*/}
            {/*          onChange={onChangeAbove19}*/}
            {/*        />*/}
            {/*        Above 19?*/}
            {/*      </FormFieldLabelText>*/}
            {/*    </FormFieldLabel>*/}
            {/*  </FormField>*/}

            {/*  <div>*/}
            {/*    <h5>Network status: {isOnline ? 'online' : 'offline'}</h5>*/}
            {/*  </div>*/}

            {/*  <div className='FormSubmit'>*/}
            {/*    <button*/}
            {/*      className='FormSubmit-Button'*/}
            {/*      onClick={onClickSubmit}*/}
            {/*      disabled={!pay || !isAbove19 || !isOnline}*/}
            {/*    >*/}
            {/*      Submit*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/*</div>*/}
        </div>
    )
}
