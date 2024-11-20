/* componente del design system */

export function Title({ children, className, as }) {
  const Component = as || 'h3'

  return (
    <Component className={className} style={{ fontSize: '24px', margin: '0' }}>
      {children}
    </Component>
  )
}