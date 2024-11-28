import { renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "./use-products";

import { describe, test, expect } from "vitest";

describe("useProducts", () => {
  test("should render the initial products", () => {
    const { result } = renderHook(useProducts);
    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
  });

  test("should fetch the products", async () => {
    const { result } = renderHook(useProducts);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    })

    expect(result.current.products).toHaveLength(30);
  });
})