import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";
import { useDispatch, useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

/**
 * test scenarios for HomePage
 *
 * - HomePage component
 *   - should render threads correctly
 *   - should filter threads by category
 */

describe("HomePage component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockImplementation((selector) =>
      selector({
        threads: [
          {
            id: "thread-1",
            title: "React Thread",
            body: "Belajar React",
            category: "react",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
            createdAt: new Date().toISOString(),
            ownerId: "user-1",
          },
          {
            id: "thread-2",
            title: "JS Thread",
            body: "Belajar JS",
            category: "javascript",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
            createdAt: new Date().toISOString(),
            ownerId: "user-2",
          },
        ],
        users: [
          {
            id: "user-1",
            name: "User 1",
            avatar: "avatar1.png",
          },
          {
            id: "user-2",
            name: "User 2",
            avatar: "avatar2.png",
          },
        ],
        authUser: { id: "user-1" },
      }),
    );

    mockDispatch.mockResolvedValue();
  });

  it("should render threads correctly", async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("React Thread")).toBeInTheDocument();
      expect(screen.getByText("JS Thread")).toBeInTheDocument();
    });
  });

  it("should filter threads by category", async () => {
    render(<HomePage />);

    const reactButton = screen.getAllByText("#react")[0];

    fireEvent.click(reactButton);

    await waitFor(() => {
      expect(screen.getByText("React Thread")).toBeInTheDocument();
      expect(screen.queryByText("JS Thread")).not.toBeInTheDocument();
    });
  });
});
