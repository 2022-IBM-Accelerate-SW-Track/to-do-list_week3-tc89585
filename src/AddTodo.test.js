import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  //represents the components
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "04/28/2023";

  //changing value of components
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const check = screen.getAllByText(/Test/i);
  expect(check.length).toBe(1);
 });

test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  //grab the components
  const inputTaskElement = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDateElement = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i});
  const dueDate = "04/23/2023";

  //fireEvent.change(inputTaskElement, {target: {}});
  fireEvent.change(inputDateElement, {target: {value: dueDate}});
  fireEvent.click(addButton);

  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
  
 });

test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  //grab the components
  const inputTaskElement = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDateElement = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i});
  const dueDate = "04/23/2023";

  fireEvent.change(inputTaskElement, {target: {value: "Test"}});
  //fireEvent.change(inputDateElement, {target: {value: dueDate}});
  fireEvent.click(addButton);

  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });



test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
   //grab the components
   const inputTaskElement = screen.getByRole('textbox', {name: /Add New Item/i});
   const inputDateElement = screen.getByPlaceholderText("mm/dd/yyyy");
   const addButton = screen.getByRole('button', {name: /Add/i});
   const dueDate = "04/23/2023";

   fireEvent.change(inputTaskElement, {target: {value: "Test"}});
   fireEvent.change(inputDateElement, {target: {value: dueDate}});
   fireEvent.click(addButton);

   const checkBoxElement = screen.getByRole('checkbox');
   fireEvent.click(checkBoxElement);
   const check = screen.getByText(/You have no todo's left/i);

   expect(check).toBeInTheDocument();

 });


test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTaskElement = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDateElement = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i});

  const validDueDate = "04/23/2023";
  const pastDueDate = "04/23/2020";

  //valid task
  fireEvent.change(inputTaskElement, {target: {value: "ValidTask"}});
  fireEvent.change(inputDateElement, {target: {value: validDueDate}});
  fireEvent.click(addButton);

  //invalid Task because past due date
  fireEvent.change(inputTaskElement, {target: {value: "BadTask"}});
  fireEvent.change(inputDateElement, {target: {value: pastDueDate}});
  fireEvent.click(addButton);

  const badTaskCheck = screen.getByTestId(/BadTask/i).style.backgroundColor;
  const validTaskCheck = screen.getByTestId(/ValidTask/i).style.backgroundColor;
  
  expect(validTaskCheck === badTaskCheck).toBe(false);

 }); 
