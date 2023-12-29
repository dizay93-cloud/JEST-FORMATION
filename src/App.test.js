import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from "./mocks/mockFetch";
import App from './App';

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("disabled reset at landing", () => {
  render(<App />);

  const resetBtn = screen.getByRole("button", { name: "Reset" });
  expect(resetBtn).toBeDisabled();

  expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
});

test("enabled reset when option selected or search executed", async () => {
  render(<App />);

  const select = screen.getByRole("combobox");
  expect(
    await screen.findByRole("option", { name: "cattledog" })
  ).toBeInTheDocument();
  userEvent.selectOptions(select, "cattledog");
  expect(select).toHaveValue("cattledog");

  const resetBtn = screen.getByRole("button", { name: "Reset" });
  expect(resetBtn).not.toBeDisabled();
  userEvent.click(resetBtn);

  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
});
