import { isElementInViewport } from "../isElementInViewport";

function createMockElement(rect: Partial<DOMRect>): HTMLElement {
  return {
    getBoundingClientRect: () => ({
      top: rect.top ?? 0,
      left: rect.left ?? 0,
      bottom: rect.bottom ?? 0,
      right: rect.right ?? 0,
      width: rect.width ?? 0,
      height: rect.height ?? 0,
      x: rect.left ?? 0,
      y: rect.top ?? 0,
      toJSON: () => rect,
    }),
  } as unknown as HTMLElement;
}

describe("isElementInViewport", () => {
  it("returns false if element is null", () => {
    expect(isElementInViewport(null as unknown as HTMLElement)).toBe(false);
  });

  it("returns true if element is fully in viewport", () => {
    const element = createMockElement({
      top: 0,
      left: 0,
      bottom: window.innerHeight,
      right: window.innerWidth,
    });
    expect(isElementInViewport(element)).toBe(true);
  });

  it("returns false if element is partially out of viewport (top)", () => {
    const element = createMockElement({
      top: -10,
      left: 0,
      bottom: 100,
      right: 100,
    });
    expect(isElementInViewport(element)).toBe(false);
  });

  it("returns false if element is partially out of viewport (right)", () => {
    const element = createMockElement({
      top: 0,
      left: 0,
      bottom: 100,
      right: window.innerWidth + 10,
    });
    expect(isElementInViewport(element)).toBe(false);
  });

  it("returns false if element is fully out of viewport", () => {
    const element = createMockElement({
      top: window.innerHeight + 1,
      left: window.innerWidth + 1,
      bottom: window.innerHeight + 10,
      right: window.innerWidth + 10,
    });
    expect(isElementInViewport(element)).toBe(false);
  });
});
