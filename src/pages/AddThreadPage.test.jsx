import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddThreadPage from "./AddThreadPage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

/**
 * test scenarios for AddThreadPage
 *
 * - AddThreadPage component
 *   - should render form correctly
 *   - should update input when user types
 *   - should show alert when form is empty
 *   - should call dispatch and navigate when form submitted correctly
 */

describe("AddThreadPage component", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
    window.alert = jest.fn();
  });

  it("should render form correctly", () => {
    render(<AddThreadPage />);

    expect(
      screen.getByPlaceholderText("Masukkan judul..."),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Contoh: react, javascript"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Tulis isi thread..."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Kirim Thread" }),
    ).toBeInTheDocument();
  });

  it("should update input when user types", () => {
    render(<AddThreadPage />);

    const titleInput = screen.getByPlaceholderText("Masukkan judul...");
    const categoryInput = screen.getByPlaceholderText(
      "Contoh: react, javascript",
    );
    const bodyInput = screen.getByPlaceholderText("Tulis isi thread...");

    fireEvent.change(titleInput, { target: { value: "Judul Test" } });
    fireEvent.change(categoryInput, { target: { value: "react" } });
    fireEvent.change(bodyInput, { target: { value: "Isi thread" } });

    expect(titleInput.value).toBe("Judul Test");
    expect(categoryInput.value).toBe("react");
    expect(bodyInput.value).toBe("Isi thread");
  });

  it("should show alert when form is empty", () => {
    render(<AddThreadPage />);

    const button = screen.getByRole("button", { name: "Kirim Thread" });

    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Semua field wajib diisi!");
  });

  it("should call dispatch and navigate when form submitted correctly", async () => {
    mockDispatch.mockResolvedValue(); // biar await dispatch aman

    render(<AddThreadPage />);

    const titleInput = screen.getByPlaceholderText("Masukkan judul...");
    const categoryInput = screen.getByPlaceholderText(
      "Contoh: react, javascript",
    );
    const bodyInput = screen.getByPlaceholderText("Tulis isi thread...");
    const button = screen.getByRole("button", { name: "Kirim Thread" });

    fireEvent.change(titleInput, { target: { value: "Judul Test" } });
    fireEvent.change(categoryInput, { target: { value: "react" } });
    fireEvent.change(bodyInput, { target: { value: "Isi thread" } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
