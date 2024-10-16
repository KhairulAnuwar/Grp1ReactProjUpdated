import Layout from "../components/Layout/Layout";
import { useState } from "react";
import Joi from 'joi-browser';
import { Box } from "@mui/material";


function FCalculator() {

  const blankForm =  {
    cpf: 0,
    cash: 0,
    income: 0,
    loan: 0,
  }

  const [form, setForm] = useState(blankForm);

  const handlerUpdateForm = (event, key) => {
    const value = parseInt(event.target.value);
    const updatedForm = { ...form, [key]: value };
    setForm(updatedForm);
  };

  const [error, setError] = useState({});

  const schema = {
    cpf: Joi.number().min(0).required(),
    cash: Joi.number().min(0).required(),
    income: Joi.number().min(0).required(),
    loan: Joi.number().min(0).required(),
  }

  const handlerOnChange = (event) => {
    const {name, value} = event.target;
    console.log(value)
    const errorMessage = validate(event);
    let errorData = {...error};

    if (errorMessage) {
      errorData[name] = errorMessage;
      console.log(errorMessage)

    } else {
      delete errorData[name];
      handlerUpdateForm(event, name)
    }
  }
  const validate = (event) => {
    const {name, value} = event.target;
    const objToCompare = {[name]: value};
    const subSchema ={[name]: schema[name]};

    const result = Joi.validate(objToCompare, subSchema);
    const {error} = result;
    return error ? error.details[0].message : null;
  }

  const handlerOnSubmit = (event) => {
    event.preventDefault();
    const result = Joi.validate(form, schema, {abortEarly: false});
    const {error} = result;
    if (!error) {
      console.log(form);
      return form;
    } else {
      const errorData = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errorData[name] = message;
      }
      setError(errorData);
      console.log(errorData);
      return errorData
    }
  }

  const loanAmt = ((form.income * 300) - (form.income * 0.2 * 300))
  const totalBudget = ( form.cpf + 
                        form.cash + 
                        loanAmt)

  return (
    <>      
    <Layout>
    <Box
      sx={{
        my: 15,
        textAlign: "left",
        p: 2,
        "& h4": {
          fontWeight: "bold",
          my: 2,
          fontSize: "2rem",
        },
        "& p": {
          textAlign: "justify",
        },
        "@media (max-width:600px)": {
          mt: 0,
          "& h4 ": {
            fontSize: "1.5rem",
          },
        },
      }}
    >
      <div>
      <h2>Budget Calculator</h2>
      <br />
      <form onSubmit={handlerOnSubmit}>
        <label>CPF:</label>
        <br />
        <input type='number' name='cpf' placeholder='Enter CPF Amount' onChange={handlerOnChange} />
        <br />
        <br />
        <label>Cash On Hand:</label>
        <br />
        <input type='number' name='cash' placeholder='Enter total cash' onChange={handlerOnChange} />
        <br />
        <br />
        <label>Monthly Income (Used to calculate 20% CPF):</label>
        <br />
        <input type='number' name='income' placeholder='Enter monthly income' onChange={handlerOnChange} />
        <br />
        <br />
        <label>Maximum Loan Amount (Calculated as 80% after taking 20% CPF into account): {loanAmt}</label>
        <br />
        <br />
        <label>Total Budget: {totalBudget}</label>
      </form>
    </div>
    </Box>
    </Layout>
      </>
    
  )
}

export default FCalculator;
