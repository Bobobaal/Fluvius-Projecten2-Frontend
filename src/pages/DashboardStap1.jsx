import { React, useEffect, useState } from "react";
import {
  Flex,
  Text,
  Select,
  FormControl,
  Input,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

//Context
import { useDashboardContext } from "../context/DashboardContext";

export default function DashboardStap1() {
  const history = useHistory();
  const {
    setDashboardValues,
    rol,
    naam,
    primair,
    getTemplateById,
  } = useDashboardContext();
  const { id } = useParams();


  function validateName(value) {
    let error;
    if (!value) {
      error = "Naam moet ingevuld zijn";
    } else if (value.length < 4) {
      error = "Naam moet uit meer dan 3 tekens bestaan";
    }
    return error;
  }

  function validateRol(value) {
    let error;
    if (value !== "0" && value !== "1" && value !== "2" && value !== "3") {
      error = "Incorrecte rol";
    }
    return error;
  }

  // if(tempNaam){
      return (
        <>
          <Formik
            initialValues={{
              naam: naam ?? "",
              rol: String(rol) ?? "0",
              primair: primair,
            }}
            onSubmit={(values, actions) => {
              setDashboardValues(values.naam, values.rol, values.primair);
              actions.setSubmitting(false);
              id?history.replace(`/dashboard/stap2/${id}`):history.replace(`/dashboard/stap2`);
            }}
          >
            {(props) => (
              <Form>
                <Flex flexDirection="column" alignItems={"center"}>
                  <Text className="title">Maak een nieuwe dashboard aan</Text>
    
                  <Text className="subtitle">Kies voor wie deze dashboard is</Text>
                  <span>
                    <Field name="rol" validate={validateRol}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.rol && form.touched.name}
                        >
                          <Select {...field} id="rol" w={"30%"} minW={"300px"} data-cy="select">
                            <option value="0">Iedereen</option>
                            <option value="1" data-cy="option1">Directie</option>
                            <option value="2">Manager</option>
                            <option value="3">Coördinator</option>
                          </Select>
                          <Text className="errormsg">{form.errors.rol}</Text>
                        </FormControl>
                      )}
                    </Field>
                  </span>
    
                  <Text className="subtitle" mt={"30px"}>
                    Geef een naam aan het dashboard
                  </Text>
                  <span>
                    <Field name="naam" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.naam && form.touched.name}
                        >
                          <Input
                            {...field}
                            id="naam"
                            placeholder="naam"
                            w={"20%"}
                            minW={"300px"}
                            data-cy="naamInput"
                          />
                          <Text className="errormsg">{form.errors.naam}</Text>
                        </FormControl>
                      )}
                    </Field>
                  </span>
    
                  <span>
                    <Field name="primair">
                      {({ field, form }) => (
                        <FormControl display={"flex"}>
                          <Text className="subtitle">
                            Deze dashboard wordt weergegeven voor de gekozen rol:
                          </Text>
                          <Checkbox
                            {...field}
                            id="primair"
                            size="lg"
                            ml={"5px"}
                            defaultChecked={primair}
                          ></Checkbox>
                        </FormControl>
                      )}
                    </Field>
                  </span>
    
                  <Button
                    mt={4}
                    className="buttonGreen"
                    isLoading={props.isSubmitting}
                    type="submit"
                    data-cy="sumbitBtn"
                  >
                    Volgende stap
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </>
      );
    // }else{
    //   return null;
    // }
}
