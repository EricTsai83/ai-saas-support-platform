/**
 * Layout wrapper that centers its children both vertically and horizontally.
 *
 * Renders a container that places the provided `children` at the center of the viewport.
 *
 * @param children - Content to render inside the centered layout
 * @returns A React element that wraps and centers the provided `children`
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-svh">{children}</div>
  );
}