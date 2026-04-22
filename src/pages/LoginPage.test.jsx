import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

// jest.mock("react-router-dom", () => {
//   return {
//     useNavigate: () => jest.fn(),
//     Link: ({ children }) => children,
//   };
// });

/**
 * test scenarios for LoginPage
 *
 * - LoginPage component
 *   - should render login form correctly
 *   - should update input when user types
 *   - should call dispatch and navigate when form submitted
 */

describe("LoginPage component", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("should render login form correctly", () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("should update input when user types", () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, {
      target: { value: "test@mail.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    expect(emailInput.value).toBe("test@mail.com");
    expect(passwordInput.value).toBe("123456");
  });

  it("should call dispatch and navigate when form submitted", () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const button = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, {
      target: { value: "test@mail.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
