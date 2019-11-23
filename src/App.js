import "./App.css";
import React from "react";
import ErrorMessage from "./components/ErrorMessage";
import "bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
import * as firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBBQu49ILehSkat3D_wku_mtyGp3PmV8rA",
  authDomain: "gbc-fs3-gp.firebaseapp.com",
  databaseURL: "https://gbc-fs3-gp.firebaseio.com",
  projectId: "gbc-fs3-gp",
  storageBucket: "gbc-fs3-gp.appspot.com",
  messagingSenderId: "305983690159",
  appId: "1:305983690159:web:4ed01954a51f434d804b5a"
};

// initialize Firebase
firebase.initializeApp(firebaseConfig);

function useTextInputState() {
  const [value, setValue] = React.useState("");
  const onChange = event => setValue(event.target.value);
  return {
    value,
    onChange
  };
}

function FormField({ children }) {
  return <div className="form-group">{children}</div>;
}

function FormFieldLabel({ children, type }) {
  let className = "FormField-Label";
  if (type === "selection") {
    className += " FormField-Label__Dropdown";
  }
  return <label className={className}>{children}</label>;
}

function FormFieldLabelText({ children, type }) {
  let className = "FormField-LabelText";
  if (type === "selection") {
    className += " FormField-LabelText__Dropdown";
  }
  return <span className={className}>{children}</span>;
}

function TextInputField({ placeholder, value, onChange, errorMessageLabel }) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasFocusedOnce, setHasFocusedOnce] = React.useState(false);

  const onFocus = () => {
    setIsFocused(true);
    setHasFocusedOnce(true);
  };

  const onBlur = () => setIsFocused(false);

  return (
    <div>
      <input
        className="FormField-Input FormField-Input__Text"
        type="text"
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
  );
}

const Diet = [
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Halal/Kosher", value: "halal/kosher" },
  { label: "None", value: "none" }
];

const Province = [
  { label: "Alberta", value: "AB" },
  { label: "British Columbia", value: "BC" },
  { label: "Manitoba", value: "MB" },
  { label: "New Brunswick", value: "NB" },
  { label: "Newfoundland and Labrador", value: "NL" },
  { label: "Nova Scotia", value: "NS" },
  { label: "Ontario", value: "ON" },
  { label: "Prince Edward Island", value: "PE" },
  { label: "Quebec", value: "QC" },
  { label: "Saskatchewan", value: "SK" },
  { label: "Northwest Territories", value: "NT" },
  { label: "Nunavut", value: "NU" },
  { label: "Yukon", value: "YT" }
];

function RadioInputField({ value, checked, onChange }) {
  return (
    <input
      className="FormField-Input FormField-Input__Radio"
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
    />
  );
}

//
//
// Starting rendering
//
//

export default function App() {
  const firstNameState = useTextInputState();
  const lastNameState = useTextInputState();
  const cityState = useTextInputState();

  const [diet, setDiet] = React.useState(null);
  const onChangeDiet = selectedDiet => setDiet(selectedDiet);

  const [province, setProvince] = React.useState(null);
  const onChangeProvince = selectedProvince => setProvince(selectedProvince);

  const [pay, setPay] = React.useState(null);
  const onChangePay = event => setPay(event.target.value);

  const [isAgree, setIsAgree] = React.useState(false);
  const onChangeAgree = event => setIsAgree(event.target.checked);

  const [activeStep, setActiveStep] = React.useState(1);

  const [formButtonText, setFormButtonText] = React.useState("Submit");

  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const displayNetworkStatus = isOnline => {
    if (isOnline) {
      return null;
    }
    return (
      <div>
        <h5 class="Warning.err">
          Network status: {isOnline ? "online" : "offline"}
        </h5>
      </div>
    );
  };

  const step1 = activeStep => {
    if (activeStep !== 1) {
      return null;
    }

    const onClickSubmit = () => {
      setActiveStep(2);
    };
    return (
      <div className="form-group">
        <h4 className="login-header">Basic Info</h4>

        <FormField className="form-group">
          <FormFieldLabel>
            <FormFieldLabelText>First Name</FormFieldLabelText>
            <TextInputField
              class="form-field"
              placeholder="Enter your first name"
              value={firstNameState.value}
              onChange={firstNameState.onChange}
              errorMessageLabel="First name required"
            />
          </FormFieldLabel>
        </FormField>

        <FormField className="form-group">
          <FormFieldLabel>
            <FormFieldLabelText>Last Name</FormFieldLabelText>
            <TextInputField
              class="form-field"
              placeholder="Enter your last name"
              value={lastNameState.value}
              onChange={lastNameState.onChange}
              errorMessageLabel="Last name required"
            />
          </FormFieldLabel>
        </FormField>

        <FormField>
          <div className="FormField-Heading">Diet Restriction</div>
          <div>
            <Select
              options={Diet}
              placeholder="None"
              value={diet}
              onChange={onChangeDiet}
            />
          </div>
        </FormField>

        <div className="FormSubmit">
          <button
            className="FormSubmit-Button"
            onClick={onClickSubmit}
            disabled={
              !firstNameState.value ||
              !lastNameState.value ||
              !diet ||
              !isOnline
            }
          >
            Continue
          </button>
        </div>
      </div>
    );
  };
  const step2 = activeStep => {
    if (activeStep !== 2) {
      return;
    }

    const onClickSubmit = () => {
      setActiveStep(3);
    };

    return (
      <div className="form-group">
        <h4 className="login-header">Address Info</h4>

        <FormField className="form-group">
          <FormFieldLabel>
            <FormFieldLabelText>City</FormFieldLabelText>

            <TextInputField
              class="form-field"
              placeholder="Enter your City"
              value={cityState.value}
              onChange={cityState.onChange}
              errorMessageLabel="City required"
            />
          </FormFieldLabel>
        </FormField>

        <FormField>
          <div className="FormField-Heading">Province</div>

          <div>
            <Select
              options={Province}
              placeholder="Select your Province"
              value={province}
              onChange={onChangeProvince}
            />
          </div>
        </FormField>

        <div className="FormSubmit">
          <button
            className="FormSubmit-Button"
            onClick={onClickSubmit}
            disabled={!cityState.value || !province || !isOnline}
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  const step3 = activeStep => {
    if (activeStep !== 3) {
      return;
    }

    const onClickSubmit = () => {
      setFormButtonText("Done");

      const dbRef = firebase.database().ref();

      function addClientBtnClicked(
        infoFirstName,
        infoLastName,
        dietRestriction,
        addressCity,
        addressProvince,
        paymentMethod,
        legalAgreeToTerms
      ) {
        //console.log("Submit clicked");

        const clientRef = dbRef.child("client");

        // object to hold new client info
        let newClient = {};

        newClient["infoFirstName"] = infoFirstName;
        newClient["infoLastName"] = infoLastName;
        newClient["dietRestriction"] = dietRestriction;
        newClient["addressCity"] = addressCity;
        newClient["addressProvince"] = addressProvince;
        newClient["paymentMethod"] = paymentMethod;
        newClient["legalAgreeToTerms"] = true;

        // push new client object to the database
        clientRef.push(newClient);

        // let postId = pushedPostRef.getKey();
        // console.log(postId);

        alert("New client record saved.");

        // reload the page
        // location.reload(true);
      }

      addClientBtnClicked(
        firstNameState.value,
        lastNameState.value,
        diet.value,
        cityState.value,
        province.value,
        pay,
        isAgree
      );
    };

    return (
      <div className="form-group">
        <h4 className="login-header">Payment Info</h4>

        <FormField className="form-group">
          <FormFieldLabel>
            <FormFieldLabelText>Payment Method</FormFieldLabelText>
            <div>
              <FormFieldLabel type="radio">
                <FormFieldLabelText type="radio">
                  <RadioInputField
                    value="bitcoin"
                    checked={pay === "bitcoin"}
                    onChange={onChangePay}
                  />
                  Bitcoin
                </FormFieldLabelText>
              </FormFieldLabel>
              <br />
              <FormFieldLabel type="radio">
                <FormFieldLabelText type="radio">
                  <RadioInputField
                    value="paypal"
                    checked={pay === "paypal"}
                    onChange={onChangePay}
                  />
                  PayPal
                </FormFieldLabelText>
              </FormFieldLabel>
              <br />
              <FormFieldLabel type="radio">
                <FormFieldLabelText type="radio">
                  <RadioInputField
                    value="credit card"
                    checked={pay === "credit card"}
                    onChange={onChangePay}
                  />
                  Credit Card
                </FormFieldLabelText>
              </FormFieldLabel>
            </div>
          </FormFieldLabel>
        </FormField>

        <FormField>
          <FormFieldLabel>
            <FormFieldLabelText>
              <input
                className="FormField-Input FormField-Input__Checkbox"
                type="checkbox"
                checked={isAgree}
                onChange={onChangeAgree}
              />
              Agree To Terms and Conditions
            </FormFieldLabelText>
          </FormFieldLabel>
        </FormField>

        <div className="FormSubmit">
          <button
            className={
              formButtonText === "Done"
                ? "btn btn-success"
                : "FormSubmit-Button"
            }
            onClick={onClickSubmit}
            disabled={!pay || !isAgree || !isOnline}
          >
            {formButtonText}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="box m-auto">
      <div className="App-Content">
        <h1 className="login-header">Checkout</h1>

        {step1(activeStep)}
        {step2(activeStep)}
        {step3(activeStep)}
        {displayNetworkStatus(isOnline)}
      </div>
    </div>
  );
}
