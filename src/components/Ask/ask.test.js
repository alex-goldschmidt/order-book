import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import BestAsk from "./index";

test("select element updates value correctly", () => {
  const onChange = jest.fn();
  render(<BestAsk onChange={onChange} />); // BestAsk is the component that contains the select element
  const selectElement = screen.getByTestId("select");
  const option1 = screen.getByTestId("option-1");
  const option2 = screen.getByTestId("option-2");
  const option3 = screen.getByTestId("option-3");
  const option4 = screen.getByTestId("option-4");

  fireEvent.change(selectElement, { target: { value: option1.value } });
  expect(selectElement.value).toBe(option1.value);
  expect(onChange).toHaveBeenCalled();

  fireEvent.change(selectElement, { target: { value: option2.value } });
  expect(selectElement.value).toBe(option2.value);
  expect(onChange).toHaveBeenCalled();

  fireEvent.change(selectElement, { target: { value: option3.value } });
  expect(selectElement.value).toBe(option3.value);
  expect(onChange).toHaveBeenCalled();

  fireEvent.change(selectElement, { target: { value: option4.value } });
  expect(selectElement.value).toBe(option4.value);
  expect(onChange).toHaveBeenCalled();
});

/*
const option2 = screen.getByTestId("option-2");

  fireEvent.change(selectElement, { target: { value: option2.value } });
  expect(selectElement.value).toBe(option2.value);
  expect(onChange).toHaveBeenCalledTimes(1);

*/
