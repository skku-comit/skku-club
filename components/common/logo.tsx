export interface LogoProps {
  size: number
}

export function Logo({ size }: LogoProps) {
  return (
    <div
      style={{
        width: size,
        height: size
      }}
    >
      Logo
    </div>
  )
}
