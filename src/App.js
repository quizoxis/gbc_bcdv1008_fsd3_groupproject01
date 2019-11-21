import './App.css'
import React from 'react'
import FormTitle from './components/FormTitle'
import FormFieldHeading from "./components/FormFieldHeading";
import FormLabel from "./components/FormLabel"
import FormTextInput from "./components/FormTextInput";


export default function App() {

    // State
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    

  return (
    <div className='App'>
      <div className='App-Content'>
        <div>
          <FormTitle>Checkout</FormTitle>
            {/* Put your solution here 👇 */}

            <FormFieldHeading>
                <FormLabel
                    htmlFor=""
                    text="Basic Info"
                    isOptional={false}
                />
            </FormFieldHeading>

            <FormFieldHeading>
                <FormLabel
                    htmlFor="firstName"
                    text="First Name"
                    isOptional={false}
                />

                <FormTextInput
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName} setValue={setFirstName}
                    type="text"
                />
            </FormFieldHeading>

            <FormFieldHeading>
                <FormLabel
                    htmlFor="lastName"
                    text="Last Name"
                    isOptional={false}
                />

                <FormTextInput
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName} setValue={setLastName}
                    type="text"
                />

            </FormFieldHeading>

            <FormFieldHeading>

                <FormLabel
                    htmlFor=""
                    text="Diet restriction"
                    isOptional={false}
                />

            </FormFieldHeading>

            <FormFieldHeading>

            </FormFieldHeading>

        </div>
      </div>
    </div>
  )
}
